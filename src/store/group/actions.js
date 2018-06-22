import {get, map, filter, omitBy, isUndefined} from 'lodash';

import {apiGroup, apiServer} from '../../api';
import {services, wsMessage} from '../../utils';
import {dbEnum, messageEnum} from '../../enums';

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
      try {
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
          role: 'admin',
          hostname: account.hostname,
          owner: account.user.username,
          shortName: data.name.substr(0, 1).toUpperCase(),
          dateCreate: dateNow,
          dateUpdate: dateNow,
        };

        await apiGroup.createGroup(sendData);

        dispatch({type: types.CREATE, payload: groupData});
        return groupData;
      } catch (e) {
        dispatch({type: types.CREATE_FAILURE, error: e});
        throw e;
      }
    };
  },

  createResult: (message) => {
    return async (dispatch, getState) => {
      try {
        const realm = services.getRealm();

        if (message.error || !message.data.success) {
          throw new Error(message.error);
        }

        const {group} = getState();

        let _group = {};
        await realm.write(() => {
          _group = realm.create(dbEnum.Group, group.current, false);
        });
        const payload = {..._group};
        console.log('group created', payload);
        dispatch({type: types.CREATE_SUCCESS, payload});
        return payload;
      } catch (e) {
        console.log('group created error', e);
        dispatch({type: types.CREATE_FAILURE, error: e});
        // throw e;
      }
    };
  },

  update: (data) => {
    return async dispatch => {
      try {
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

        await apiGroup.updateGroup(sendData);

        dispatch({type: types.UPDATE, payload: data});
        return data;
      } catch (e) {
        dispatch({type: types.UPDATE_FAILURE, error: e});
        throw e;
      }
    };
  },

  updateResult: (message) => {
    return async (dispatch, getState) => {
      try {
        const realm = services.getRealm();

        if (message.error || !message.data.success) {
          throw new Error(message.error);
        }

        const {group} = getState();

        let _group = {};
        await realm.write(() => {
          _group = realm.create(dbEnum.Group, group.current, true);
        });
        const payload = {..._group};
        // console.log('group updated', payload);
        dispatch({type: types.UPDATE_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.UPDATE_FAILURE, error: e});
        // throw e;
      }
    };
  },

  delete: (ids) => {
    return async dispatch => {
      try {
        const realm = services.getRealm();
        let groups = realm.objects(dbEnum.Group);
        groups = groups.filter((item) => ids.indexOf(item.id) >= 0);

        if (!groups || !groups.length) {
          throw new Error('delete failed: groups are not found');
        }

        for (let i = 0; i < groups.length; i++) {
          await apiGroup.deleteGroup(groups[i].link);
        }

        dispatch({type: types.DELETE, payload: ids});
        return true;
      } catch (e) {
        dispatch({type: types.DELETE_FAILURE, error: e});
        throw e;
      }
    };
  },

  deleteById: (id) => {
    return async dispatch => {
      try {
        const realm = services.getRealm();
        const group = realm.objectForPrimaryKey(dbEnum.Group, id);

        if (!group) {
          throw new Error('delete failed: group is not found');
        }

        await apiGroup.deleteGroup(group.link);

        dispatch({type: types.DELETE, payload: [id]});
        return true;
      } catch (e) {
        dispatch({type: types.DELETE_FAILURE, error: e});
        throw e;
      }
    };
  },

  deleteResult: (message) => {
    return async (dispatch, getState) => {
      try {
        const realm = services.getRealm();

        if (message.error || !message.data.success) {
          throw new Error(message.error);
        }

        const {group} = getState();
        let groups = realm.objects(dbEnum.Group);
        groups = groups.filter((item) => group.deleted.indexOf(item.id) >= 0);

        if (!groups || !groups.length) {
          return group.deleted;
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
        }
        // console.log('groups deleted', group.deleted);
        dispatch({type: types.DELETE_SUCCESS, payload: group.deleted});
        return group.deleted;
      } catch (e) {
        dispatch({type: types.DELETE_FAILURE, error: e});
        // throw e;
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

  getGroupResult: (message) => {
    return async (dispatch, getState) => {
      try {
        const realm = services.getRealm();
        const {account, group} = getState();
        let payload = null;

        if (message.error) {
          throw new Error(message.error);
        }

        const data = get(message, 'data', null);

        // subscribed to group and wait group info
        if (group.subscribeLink) {
          if (!data) {
            dispatch({type: types.SUBSCRIBE_FAILURE, error: 'subscribe failed: data is null'});
            return false;
          }
          const groupData = {
            id: wsMessage.generateUuid(),
            link: data.link,
            type: data.group_type,
            name: data.name,
            description: data.description || '',
            role: 'member',
            hostname: account.hostname,
            owner: data.owner,
            avatar: data.avatar || '',
            shortName: data.name.substr(0, 1).toUpperCase(),
            dateCreate: wsMessage.rfcToDate(data.dt_create),
            dateUpdate: new Date(),
          };
          let _group = {};
          await realm.write(() => {
            _group = realm.create(dbEnum.Group, groupData, false);
          });
          payload = {..._group};
          // console.log('subscribed to group result', payload);
          dispatch({type: types.SUBSCRIBE_SUCCESS, payload});
          return payload;
        }

        // get group info success
        if (!data) {
          throw new Error('get group failed: data is null');
        }

        payload = {
          ...data,
          type: data.group_type,
          dateCreate: wsMessage.rfcToDate(data.dt_create),
        };
        // console.log('get group result', payload);
        dispatch({type: types.GET_GROUP_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.GET_GROUP_FAILURE, error: e});
        // throw e;
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

  getPublicGroupListResult: (message) => {
    if (message.error) {
      return {type: types.GET_PUBLIC_LIST_FAILURE, error: message.error};
    }

    const payload = message.data.map((item) => {
      item.type = item.group_type;
      return item;
    });

    return {type: types.GET_PUBLIC_LIST_SUCCESS, payload};
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

  inviteResult: (message) => {
    if (message.error || !message.data.success) {
      return {type: types.INVITE_FAILURE, error: message.error};
    }

    return {type: types.INVITE_SUCCESS};
  },

  receiveInvite: (message) => {
    return async dispatch => {
      try {
        // send delivery report
        const msgEncryptTime =  get(message, 'encrypt_time', null);
        await apiServer.deliveryReport(msgEncryptTime);

        const link = get(message, 'data', null);
        const from = get(message, 'from', null);

        if (!link) {
          throw new Error('receive invite failed: link is null');
        }

        const payload = {link, from};
        // console.log('received invite', payload);
        dispatch({type: types.RECEIVE_INVITE_SUCCESS, payload});
        return link;
      } catch (e) {
        dispatch({type: types.RECEIVE_INVITE_FAILURE, error: e});
        // throw e;
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
        await apiGroup.getGroup(link);
        return await apiGroup.subscribeToGroup(link);
      } catch (e) {
        dispatch({type: types.SUBSCRIBE_FAILURE, error: e});
        throw e;
      }
    };
  },

  subscribeToGroupResult: (message) => {
    if (message.error || !message.data.success) {
      return {type: types.SUBSCRIBE_FAILURE, error: message.error};
    }
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

  unsubscribeFromGroupResult: (message) => {
    return async (dispatch, getState) => {
      const realm = services.getRealm();
      try {
        if (message.error || !message.data.success) {
          throw new Error(message.error);
        }

        const {group} = getState();

        const groups = realm.objects(dbEnum.Group).filtered(`link = '${group.unsubscribeLink}'`);
        if (!groups || !groups.length) {
          throw new Error(`group link '${group.unsubscribeLink}' is not found`);
        }
        if (groups.length > 1) {
          throw new Error(`more than one group with link '${group.unsubscribeLink}' found`);
        }

        await realm.write(() => {
          groups[0].isSubscribed = false;
          groups[0].dateUpdate = new Date();
        });
        const payload = {...groups[0]};
        // console.log('unsubscribed from group', payload);
        dispatch({type: types.UNSUBSCRIBE_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.UNSUBSCRIBE_FAILURE, error: e});
        // throw e;
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

  getGroupMemberResult: (message) => {
    if (message.error) {
      return {type: types.GET_MEMBER_FAILURE, error: message.error};
    }

    const data = get(message, 'data', null);

    if (!data) {
      return {type: types.GET_MEMBER_FAILURE, error: 'get group member result failed: no data'};
    }

    const payload = {
      ...data,
      link: data.group_chat_link,
      isBanned: !!data.dt_ban,
      dateBan: data.dt_ban ? wsMessage.rfcToDate(data.dt_ban) : '',
      banReason: data.ban_reason,
    };

    return {type: types.GET_MEMBER_SUCCESS, payload};
  },

  updateGroupMember: (data) => {
    return async dispatch => {
      dispatch({type: types.UPDATE_MEMBER, payload: data});
      try {
        if (!data.link) {
          throw new Error('update group member failed: link is empty');
        }
        if (!data.username) {
          throw new Error('update group member failed: username is empty');
        }

        const sendData = {
          link: data.link,
          username: data.username,
          role: data.role,
          dt_ban: wsMessage.dateToRfc(data.dateBan),
          ban_reason: data.banReason,
        };

        return await apiGroup.updateGroupMember(sendData);
      } catch (e) {
        dispatch({type: types.UPDATE_MEMBER_FAILURE, error: e});
        throw e;
      }
    };
  },

  updateGroupMemberResult: (message) => {
    if (message.error || !message.data.success) {
      return {type: types.UPDATE_MEMBER_FAILURE, error: message.error};
    }

    return {type: types.UPDATE_MEMBER_SUCCESS};
  },

  setCurrentGroup: (data) => {
    return {type: types.SET_CURRENT_GROUP, payload: data};
  },
};
