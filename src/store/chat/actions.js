import {get, map} from 'lodash';

import apiChat from '../../api/chat';
import {services, wsMessage} from '../../utils';
import {dbEnum} from '../../enums';
import CONFIG from '../../config';

export const types = {
  LOAD: 'LOAD',
  LOAD_SUCCESS: 'LOAD_SUCCESS',
  LOAD_FAILURE: 'LOAD_FAILURE',

  LOAD_ONE: 'LOAD_ONE',
  LOAD_ONE_SUCCESS: 'LOAD_ONE_SUCCESS',
  LOAD_ONE_FAILURE: 'LOAD_ONE_FAILURE',

  CREATE: 'CREATE',
  CREATE_SUCCESS: 'CREATE_SUCCESS',
  CREATE_FAILURE: 'CREATE_FAILURE',

  UPDATE: 'UPDATE',
  UPDATE_SUCCESS: 'UPDATE_SUCCESS',
  UPDATE_FAILURE: 'UPDATE_FAILURE',

  DELETE: 'DELETE',
  DELETE_SUCCESS: 'DELETE_SUCCESS',
  DELETE_FAILURE: 'DELETE_FAILURE',

  RECEIVE_CHAT_SUCCESS: 'RECEIVE_CHAT_SUCCESS',
  RECEIVE_CHAT_FAILURE: 'RECEIVE_CHAT_FAILURE',
};

const hashKeyAdd = async (data) => {
  const realm = services.getRealm();
  await realm.write(() => {
    realm.create(dbEnum.HashKey, data, true);
  });
  const hashKeys = realm.objects(dbEnum.HashKey)
    .sorted('dateSend')
    .filtered(`chatId = ${data.chatId}`);
  if (hashKeys.length > CONFIG.maxHashCount) {
    await realm.write(() => {
      realm.delete(hashKeys[0]);
    });
  }
};

export default {

  loadList: (filter = '', sort = 'dateCreate', descending = true) => {
    return async dispatch => {
      dispatch({type: types.LOAD});
      try {
        const realm = services.getRealm();
        let chatList = realm.objects(dbEnum.Chat)
          .sorted(sort, descending);
        if (filter) {
          chatList = chatList.filtered(filter);
        }
        // console.log('chat list loaded', chatList.length);
        const payload = [...chatList];
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
        const chat = realm.objectForPrimaryKey(dbEnum.Chat, id);
        // console.log('chat loaded', chat);
        const payload = {...chat};
        dispatch({type: types.LOAD_ONE_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.LOAD_ONE_FAILURE, error: e});
        throw e;
      }
    };
  },

  create: (contacts) => {
    return async (dispatch, getState) => {
      dispatch({type: types.CREATE});
      try {
        const realm = services.getRealm();
        const {account} = getState();
        const dateNow = new Date();
        const sendData = {
          id: wsMessage.generateUuid(),
          name: map(contacts, 'nickname').join(', '),
          owner: account.user.username,
          members: map(contacts, 'username'),
          shortName: `G${contacts.length}`.substr(0, 2),
          salt: wsMessage.generateUuid(),
          dateSend: dateNow,
        };
        const chatData = {
          ...sendData,
          dateCreate: dateNow,
          dateUpdate: dateNow,
        };
        let chat = {};
        await realm.write(() => {
          chat = realm.create(dbEnum.Chat, chatData, true);
        });
        const payload = {...chat};
        // console.log('chat created', chat);
        const apiResult = apiChat.createChat(sendData, contacts);
        const hashKeyData = {
          chatId: chat.id,
          hashKey: apiResult.hashKey,
          dateSend: chat.dateSend,
        };
        await hashKeyAdd(hashKeyData);
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
        await realm.write(() => {
          realm.create(dbEnum.Chat, data, true);
        });
        const chat = realm.objectForPrimaryKey(dbEnum.Chat, data.id);
        const payload = {...chat};
        // console.log('chat updated', chat);
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
        const chat = realm.objectForPrimaryKey(dbEnum.Chat, id);
        if (!chat) {
          throw new Error('delete failed: chat is not found');
        }
        await realm.write(() => {
          realm.delete(chat);
        });
        // console.log('chat deleted', chat);
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
        const payload = get(message, 'data.payload', {});
        if (!payload) {
          throw new Error('payload is null');
        }
        const decryptedData = await wsMessage.decryptClientMessage({
          data: payload,
          privateKey: account.keys.privateKey
        });
        const chatData = {
          ...decryptedData,
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
};
