import {get, map, filter} from 'lodash';

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

  RECEIVE_CHAT_SUCCESS: Symbol('RECEIVE_CHAT_SUCCESS'),
  RECEIVE_CHAT_FAILURE: Symbol('RECEIVE_CHAT_FAILURE'),

  SET_CURRENT_CHAT: Symbol('SET_CURRENT_CHAT'),
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
        const payload = [...groupList];
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
        const dateNow = new Date();
        const sendData = {
          link: data.link,
          group_type: data.type,
          name: data.name,
          description: data.description || '',
          avatar: data.avatar || null,
          members: data.members || [],
        };
        const groupData = {
          ...data,
          id: wsMessage.generateUuid(),
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
        const apiResult = await apiGroup.createGroup(sendData);
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
        data.dateUpdate = new Date();
        let chat = {};
        await realm.write(() => {
          chat = realm.create(dbEnum.Chat, data, true);
        });
        const payload = {...chat};
        // console.log('chat updated', chat);
        // TODO - send updated chat to members
        dispatch({type: types.UPDATE_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.UPDATE_FAILURE, error: e});
        throw e;
      }
    };
  },

  delete: (id) => {
    return async dispatch => {
      dispatch({type: types.DELETE});
      try {
        const realm = services.getRealm();
        // const chat = realm.objects(dbEnum.Chat); // remove all chats for testing
        const chat = realm.objectForPrimaryKey(dbEnum.Chat, id);
        if (!chat) {
          throw new Error('delete failed: chat is not found');
        }
        await realm.write(() => {
          realm.delete(chat);
        });
        // console.log('chat deleted', id);
        dispatch({type: types.DELETE_SUCCESS, payload: id});
        return true;
      } catch (e) {
        dispatch({type: types.DELETE_FAILURE, error: e});
        throw e;
      }
    };
  },

  receiveChat: (message) => {
    return async (dispatch, getState) => {
      try {
        const realm = services.getRealm();
        const {account} = getState();
        const dateNow = new Date();
        const dataPayload = get(message, 'data.payload', {});
        if (!dataPayload) {
          throw new Error('data.payload is null');
        }
        const decryptedData = await wsMessage.decryptClientMessage({
          data: dataPayload,
          privateKey: account.keys.privateKey
        });
        const members = filter(decryptedData.members, (username) => username !== account.user.username);
        const contacts = map(members, (username) => {
          return {
            username: username,
            nickname: username.split('@')[0],
          };
        });
        const chatData = {
          ...decryptedData,
          name: map(contacts, 'nickname').join(', '),
          shortName: wsMessage.getShortName(contacts),
          isShown: false,
          dateSend: wsMessage.dateSendToDate(decryptedData.dateSend),
          dateCreate: dateNow,
          dateUpdate: dateNow,
        };
        let chat = {};
        await realm.write(() => {
          chat = realm.create(dbEnum.Chat, chatData, true);
        });
        const payload = {...chat};
        // console.log('chat received', chat);
        const hashKeyData = {
          chatId: chat.id,
          hashKey: wsMessage.hashFromMessage(decryptedData),
          dateSend: chat.dateSend,
        };
        await hashKeyAdd(hashKeyData);
        dispatch({type: types.RECEIVE_CHAT_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.RECEIVE_CHAT_FAILURE, error: e});
        throw e;
      }
    };
  },

  setCurrentChat: (data) => {
    return {type: types.SET_CURRENT_CHAT, payload: data};
  },
};
