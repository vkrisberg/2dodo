import {get, map} from 'lodash';

import apiChat from '../../api/chat';
import {services, wsMessage} from '../../utils';
import {dbEnum} from '../../enums';
import CONFIG from '../../config';

export const types = {
  LOAD: 'LOAD',
  LOAD_SUCCESS: 'LOAD_SUCCESS',
  LOAD_FAILURE: 'LOAD_FAILURE',

  SEND: 'SEND',
  SEND_SUCCESS: 'SEND_SUCCESS',
  SEND_FAILURE: 'SEND_FAILURE',

  RECEIVE_MESSAGE_SUCCESS: 'RECEIVE_MESSAGE_SUCCESS',
  RECEIVE_MESSAGE_FAILURE: 'RECEIVE_MESSAGE_FAILURE',

  RECEIVE_STATUS_SUCCESS: 'RECEIVE_STATUS_SUCCESS',
  RECEIVE_STATUS_FAILURE: 'RECEIVE_STATUS_FAILURE',
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

  loadList: (filter = '', sort = 'dateCreate', descending = false) => {
    return async dispatch => {
      dispatch({type: types.LOAD});
      try {
        const realm = services.getRealm();
        let messages = realm.objects(dbEnum.ChatMessage)
          .sorted(sort, descending);
        if (filter) {
          messages = messages.filtered(filter);
        }
        // console.log('chat messages loaded', messages.length);
        const payload = [...messages];
        dispatch({type: types.LOAD_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.LOAD_FAILURE, error: e});
        throw e;
      }
    };
  },

  send: ({data, contacts, timeDead}) => {
    return async dispatch => {
      dispatch({type: types.SEND});
      try {
        const realm = services.getRealm();
        const dateNow = new Date();
        const sendData = {
          ...data,
          salt: wsMessage.generateUuid(),
          dateSend: dateNow,
        };
        const messageData = {
          ...data,
          isOwn: true,
          dateCreate: dateNow,
          dateUpdate: dateNow,
        };
        let message = {};
        await realm.write(() => {
          message = realm.create(dbEnum.Chat, messageData, true);
        });
        const payload = {...message};
        // console.log('chat message created', message);
        const apiResult = apiChat.sendChatMessage({data: sendData, contacts, timeDead});
        const hashKeyData = {
          chatId: message.chatId,
          hashKey: apiResult.hashKey,
          dateSend: message.dateSend,
        };
        await hashKeyAdd(hashKeyData);
        dispatch({type: types.SEND_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.SEND_FAILURE, error: e});
        throw e;
      }
    };
  },

  receiveMessage: (message) => {
    return async dispatch => {
      try {
        const realm = services.getRealm();
        const dateNow = new Date();
        const meta = get(message, 'data.meta', null);
        if (!meta) {
          throw new Error('data.meta is null');
        }
        const payload = get(message, 'data.payload', null);
        if (!payload) {
          throw new Error('data.payload is null');
        }
        let encryptTime = get(message, 'encrypt_time', null);
        encryptTime = wsMessage.dateSendToDate(encryptTime);
        const hashKeys = realm.objects(dbEnum.HashKey)
          .filtered(`chatId = ${meta.chatId} AND dateSend = ${encryptTime}`);
        if (!hashKeys.length || hashKeys.length > 1) {
          throw new Error('hashKey not found or more than one');
        }
        const decryptedData = await wsMessage.decryptChatMessage({
          data: payload,
          hashKey: hashKeys[0],
        });
        const messageData = {
          ...decryptedData,
          isOwn: false,
          dateSend: wsMessage.dateSendToDate(decryptedData.dateSend),
          dateCreate: dateNow,
          dateUpdate: dateNow,
        };
        let message = {};
        await realm.write(() => {
          message = realm.create(dbEnum.ChatMessage, messageData, true);
        });
        const payload = {...message};
        // console.log('chat message received', message);
        const hashKeyData = {
          chatId: message.chatId,
          hashKey: wsMessage.hashFromMessage(decryptedData),
          dateSend: message.dateSend,
        };
        await hashKeyAdd(hashKeyData);
        dispatch({type: types.RECEIVE_MESSAGE_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.RECEIVE_MESSAGE_FAILURE, error: e});
        throw e;
      }
    };
  },

  receiveMessageStatus: (message) => {
    return async dispatch => {
    };
  },
};
