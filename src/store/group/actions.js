import {get, map, filter, omitBy, isUndefined} from 'lodash';

import apiGroup from '../../api/group';
import {services, wsMessage} from '../../utils';
import {dbEnum} from '../../enums';
import CONFIG from '../../config';

export const types = {
  LOAD: Symbol('LOAD'),
  LOAD_SUCCESS: Symbol('LOAD_SUCCESS'),
  LOAD_FAILURE: Symbol('LOAD_FAILURE'),

  LOAD_ONE: Symbol('LOAD_ONE'),
  LOAD_ONE_SUCCESS: Symbol('LOAD_ONE_SUCCESS'),
  LOAD_ONE_FAILURE: Symbol('LOAD_ONE_FAILURE'),

  CREATE: Symbol('CREATE'),
  CREATE_SUCCESS: Symbol('CREATE_SUCCESS'),
  CREATE_FAILURE: Symbol('CREATE_FAILURE'),

  UPDATE: Symbol('UPDATE'),
  UPDATE_SUCCESS: Symbol('UPDATE_SUCCESS'),
  UPDATE_FAILURE: Symbol('UPDATE_FAILURE'),

  DELETE: Symbol('DELETE'),
  DELETE_SUCCESS: Symbol('DELETE_SUCCESS'),
  DELETE_FAILURE: Symbol('DELETE_FAILURE'),

  GET_GROUP: Symbol('GET_GROUP'),
  GET_GROUP_SUCCESS: Symbol('GET_GROUP_SUCCESS'),
  GET_GROUP_FAILURE: Symbol('GET_GROUP_FAILURE'),

  GET_PUBLIC_LIST: Symbol('GET_PUBLIC_LIST'),
  GET_PUBLIC_LIST_SUCCESS: Symbol('GET_PUBLIC_LIST_SUCCESS'),
  GET_PUBLIC_LIST_FAILURE: Symbol('GET_PUBLIC_LIST_FAILURE'),

  INVITE: Symbol('INVITE'),
  INVITE_SUCCESS: Symbol('INVITE_SUCCESS'),
  INVITE_FAILURE: Symbol('INVITE_FAILURE'),

  SUBSCRIBE: Symbol('SUBSCRIBE'),
  SUBSCRIBE_SUCCESS: Symbol('SUBSCRIBE_SUCCESS'),
  SUBSCRIBE_FAILURE: Symbol('SUBSCRIBE_FAILURE'),

  UNSUBSCRIBE: Symbol('UNSUBSCRIBE'),
  UNSUBSCRIBE_SUCCESS: Symbol('UNSUBSCRIBE_SUCCESS'),
  UNSUBSCRIBE_FAILURE: Symbol('UNSUBSCRIBE_FAILURE'),

  GET_MEMBER: Symbol('GET_MEMBER'),
  GET_MEMBER_SUCCESS: Symbol('GET_MEMBER_SUCCESS'),
  GET_MEMBER_FAILURE: Symbol('GET_MEMBER_FAILURE'),

  UPDATE_MEMBER: Symbol('UPDATE_MEMBER'),
  UPDATE_MEMBER_SUCCESS: Symbol('UPDATE_MEMBER_SUCCESS'),
  UPDATE_MEMBER_FAILURE: Symbol('UPDATE_MEMBER_FAILURE'),

  RECEIVE_INVITE_SUCCESS: Symbol('RECEIVE_INVITE_SUCCESS'),
  RECEIVE_INVITE_FAILURE: Symbol('RECEIVE_INVITE_FAILURE'),

  SET_CURRENT_GROUP: Symbol('SET_CURRENT_GROUP'),
};

export default {

  loadList: (filter = '', sort = 'dateCreate', descending = true) => {
    return async dispatch => {
      dispatch({type: types.LOAD});
      try {
        const realm = services.getRealm();
        let groupList = realm.objects(dbEnum.Group)
          .sorted(sort, descending);
        if (filter) {
          groupList = groupList.filtered(filter);
        }

        // TODO - remove after tests
        // await realm.write(() => {
        //   realm.delete(groupList);
        // });

        console.log('group list loaded', groupList.length);
        const payload = groupList.map((item) => {
          return {...item};
        });
        dispatch({type: types.LOAD_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.LOAD_FAILURE, error: e});
        throw e;
      }
    };
  },

  loadOne: (id) => {
    return async dispatch => {
      dispatch({type: types.LOAD_ONE});
      try {
        const realm = services.getRealm();
        const group = realm.objectForPrimaryKey(dbEnum.Group, id);
        if (!group) {
          throw new Error('group is not found in database');
        }
        // console.log('group loaded', group);
        const payload = {...group};
        dispatch({type: types.LOAD_ONE_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.LOAD_ONE_FAILURE, error: e});
        throw e;
      }
    };
  },

  create: (data) => {
    return async (dispatch, getState) => {
      dispatch({type: types.CREATE});
      try {
        const realm = services.getRealm();
        const {account} = getState();

        data = omitBy(data, isUndefined);
        if (!data.link) {
          throw new Error('create group failed: link is empty');
        }

        if (!data.type) {
          throw new Error('create group failed: group type is empty');
        }

        if (!data.name) {
          throw new Error('create group failed: name is empty');
        }

        const dateNow = new Date();
        const sendData = {
          link: data.link,
          group_type: data.type,
          name: data.name,
          description: data.description || '',
          avatar: data.avatar || '',
          members: data.members || [],
        };
        const groupData = {
          ...data,
          id: wsMessage.generateUuid(),
          hostname: account.hostname,
          owner: 'admin',
          shortName: data.name.substr(0, 1).toUpperCase(),
          dateCreate: dateNow,
          dateUpdate: dateNow,
        };
        let group = {};
        await realm.write(() => {
          group = realm.create(dbEnum.Group, groupData, false);
        });
        const payload = {...group};
        // console.log('group created', group);
        await apiGroup.createGroup(sendData);
        dispatch({type: types.CREATE_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.CREATE_FAILURE, error: e});
        throw e;
      }
    };
  },

  update: (data) => {
    return async dispatch => {
      dispatch({type: types.UPDATE});
      try {
        const realm = services.getRealm();

        data = omitBy(data, isUndefined);
        if (!data.link) {
          throw new Error('update group failed: link is empty');
        }

        if (!data.name) {
          throw new Error('update group failed: name is empty');
        }

        data.dateUpdate = new Date();
        const sendData = {
          link: data.link,
          name: data.name,
          description: data.description || '',
          avatar: data.avatar || '',
        };

        let group = {};
        await realm.write(() => {
          group = realm.create(dbEnum.Group, data, true);
        });
        const payload = {...group};
        // console.log('group updated', group);
        await apiGroup.updateGroup(sendData);
        dispatch({type: types.UPDATE_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.UPDATE_FAILURE, error: e});
        throw e;
      }
    };
  },

  delete: (ids) => {
    return async dispatch => {
      dispatch({type: types.DELETE});
      try {
        const realm = services.getRealm();
        let groups = realm.objects(dbEnum.Group);
        groups = groups.filter((item) => ids.indexOf(item.id) >= 0);

        if (!groups || !groups.length) {
          throw new Error('delete failed: groups are not found');
        }

        const deletedGroups = groups.map((item) => {
          return {...item};
        });

        await realm.write(() => {
          realm.delete(groups);
        });

        for (let i = 0; i < deletedGroups.length; i++) {
          const group = deletedGroups[i];
          const messages = realm.objects(dbEnum.GroupMessage).filtered(`groupId = '${group.id}'`);
          await realm.write(() => {
            realm.delete(messages);
          });
          await apiGroup.deleteGroup(group.link);
        }

        // console.log('groups deleted', ids);
        dispatch({type: types.DELETE_SUCCESS, payload: ids});
        return true;
      } catch (e) {
        dispatch({type: types.DELETE_FAILURE, error: e});
        throw e;
      }
    };
  },

  deleteById: (id) => {
    return async dispatch => {
      dispatch({type: types.DELETE});
      try {
        const realm = services.getRealm();
        const group = realm.objectForPrimaryKey(dbEnum.Group, id);

        if (!group) {
          throw new Error('delete failed: group is not found');
        }

        const deletedGroup = {...group};

        await realm.write(() => {
          realm.delete(group);
        });

        const messages = realm.objects(dbEnum.GroupMessage).filtered(`groupId = '${id}'`);
        await realm.write(() => {
          realm.delete(messages);
        });
        await apiGroup.deleteGroup(deletedGroup.link);
        // console.log('group deleted', id);
        dispatch({type: types.DELETE_SUCCESS, payload: id});
        return true;
      } catch (e) {
        dispatch({type: types.DELETE_FAILURE, error: e});
        throw e;
      }
    };
  },

  getGroup: (link) => {
    return async dispatch => {
      dispatch({type: types.GET_GROUP, payload: link});
      try {
        if (!link) {
          throw new Error('get group failed: link is empty');
        }
        return await apiGroup.getGroup(link);
      } catch (e) {
        dispatch({type: types.GET_GROUP_FAILURE, error: e});
        throw e;
      }
    };
  },

  getPublicGroupList: () => {
    return async dispatch => {
      dispatch({type: types.GET_PUBLIC_LIST});
      try {
        return await apiGroup.getPublicGroupList();
      } catch (e) {
        dispatch({type: types.GET_PUBLIC_LIST_FAILURE, error: e});
        throw e;
      }
    };
  },

  inviteMembers: ({link, members}) => {
    return async dispatch => {
      dispatch({type: types.INVITE, payload: {link, members}});
      try {
        if (!link || !members || !members.length) {
          throw new Error('invite members failed: link or members empty');
        }
        return await apiGroup.inviteMembers({link, members});
      } catch (e) {
        dispatch({type: types.INVITE_FAILURE, error: e});
        throw e;
      }
    };
  },

  subscribeToGroup: (link) => {
    return async dispatch => {
      dispatch({type: types.SUBSCRIBE, payload: link});
      try {
        if (!link) {
          throw new Error('subscribe to group failed: link is empty');
        }
        return await apiGroup.subscribeToGroup(link);
      } catch (e) {
        dispatch({type: types.SUBSCRIBE_FAILURE, error: e});
        throw e;
      }
    };
  },

  unsubscribeFromGroup: (link) => {
    return async dispatch => {
      dispatch({type: types.UNSUBSCRIBE, payload: link});
      try {
        if (!link) {
          throw new Error('unsubscribe from group failed: link is empty');
        }
        return await apiGroup.unsubscribeFromGroup(link);
      } catch (e) {
        dispatch({type: types.UNSUBSCRIBE_FAILURE, error: e});
        throw e;
      }
    };
  },

  getGroupMember: (data) => {
    return async dispatch => {
      dispatch({type: types.GET_MEMBER, payload: data});
      try {
        if (!data.link) {
          throw new Error('get group member failed: link is empty');
        }
        if (!data.username) {
          throw new Error('get group member failed: username is empty');
        }
        return await apiGroup.getGroupMember(data);
      } catch (e) {
        dispatch({type: types.GET_MEMBER_FAILURE, error: e});
        throw e;
      }
    };
  },

  updateGroupMember: (data) => {
    return async dispatch => {
      dispatch({type: types.UPDATE_MEMBER, payload: data});
      try {
        if (!data.link) {
          throw new Error('get group member failed: link is empty');
        }
        if (!data.username) {
          throw new Error('get group member failed: username is empty');
        }
        return await apiGroup.updateGroupMember(data);
      } catch (e) {
        dispatch({type: types.UPDATE_MEMBER_FAILURE, error: e});
        throw e;
      }
    };
  },

  setCurrentGroup: (data) => {
    return {type: types.SET_CURRENT_GROUP, payload: data};
  },
};
