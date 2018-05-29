import {get, map, filter} from 'lodash';

import apiChat from '../../api/chat';
import {services, wsMessage} from '../../utils';
import {dbEnum, messageEnum} from '../../enums';
import CONFIG from '../../config';

export const types = {
  LOAD: 'LOAD',
  LOAD_SUCCESS: 'LOAD_SUCCESS',
  LOAD_FAILURE: 'LOAD_FAILURE',

  SEND: 'SEND',
  SEND_SUCCESS: 'SEND_SUCCESS',
  SEND_FAILURE: 'SEND_FAILURE',

  RESEND: 'RESEND',
  RESEND_SUCCESS: 'RESEND_SUCCESS',
  RESEND_FAILURE: 'RESEND_FAILURE',

  EDIT: 'EDIT',
  EDIT_SUCCESS: 'EDIT_SUCCESS',
  EDIT_FAILURE: 'EDIT_FAILURE',

  DELETE: 'DELETE',
  DELETE_SUCCESS: 'DELETE_SUCCESS',
  DELETE_FAILURE: 'DELETE_FAILURE',

  RECEIVE_MESSAGE_SUCCESS: 'RECEIVE_MESSAGE_SUCCESS',
  RECEIVE_MESSAGE_FAILURE: 'RECEIVE_MESSAGE_FAILURE',

  RECEIVE_STATUS_SUCCESS: 'RECEIVE_STATUS_SUCCESS',
  RECEIVE_STATUS_FAILURE: 'RECEIVE_STATUS_FAILURE',

  SEND_MEDIA: 'SEND_MEDIA',
  SEND_MEDIA_SUCCESS: 'SEND_MEDIA_SUCCESS',
  SEND_MEDIA_FAILURE: 'SEND_MEDIA_FAILURE',
};

const hashKeyAdd = async (data) => {
  const realm = services.getRealm();
  await realm.write(() => {
    realm.create(dbEnum.HashKey, data, true);
  });
  const hashKeys = realm.objects(dbEnum.HashKey)
    .sorted('dateSend')
    .filtered(`chatId = '${data.chatId}'`);
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
        console.log('chat messages loaded', messages.length);
        const payload = [...messages];
        dispatch({type: types.LOAD_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.LOAD_FAILURE, error: e});
        throw e;
      }
    };
  },

  send: ({data, chatId, timeDead}) => {
    return async (dispatch, getState) => {
      dispatch({type: types.SEND});
      try {
        const realm = services.getRealm();
        const {account} = getState();
        const dateNow = new Date();
        const chat = realm.objectForPrimaryKey(dbEnum.Chat, chatId);
        if (!chat) {
          throw new Error(`chat '${chatId}' is not found`);
        }
        const members = filter(chat.members, (username) => username !== account.user.username);
        const sendData = {
          ...data,
          chatId,
          id: wsMessage.generateUuid(),
          salt: wsMessage.generateUuid(),
          dateSend: dateNow,
        };
        const messageData = {
          ...sendData,
          isOwn: true,
          dateCreate: dateNow,
          dateUpdate: dateNow,
        };
        let chatMessage = {};
        await realm.write(() => {
          chatMessage = realm.create(dbEnum.ChatMessage, messageData, false);
        });
        const payload = {...chatMessage};
        // console.log('chat message created', chatMessage);
        const hashKeys = realm.objects(dbEnum.HashKey)
          .sorted('dateSend', true)
          .filtered(`chatId = '${chatId}'`);
        if (!hashKeys.length) {
          throw new Error(`hashKeys is empty for chatId = ${chatId}`);
        }
        const encryptTime = hashKeys[0].dateSend;
        const hashKey = hashKeys[0].hashKey;
        const apiResult = await apiChat.sendChatMessage({
          data: sendData,
          members,
          timeDead,
          encryptTime,
          hashKey,
        });
        const hashKeyData = {
          chatId: chatMessage.chatId,
          messageId: chatMessage.id,
          hashKey: apiResult.hashKey,
          dateSend: chatMessage.dateSend,
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

  resend: (id, timeDead) => {
    return async (dispatch, getState) => {
      dispatch({type: types.RESEND});
      try {
        const realm = services.getRealm();
        const {account} = getState();
        const chatMessage = realm.objectForPrimaryKey(dbEnum.ChatMessage, id);
        const chat = realm.objectForPrimaryKey(dbEnum.Chat, chatMessage.chatId);
        const members = filter(chat.members, (username) => username !== account.user.username);
        await realm.write(() => {
          chatMessage.status = messageEnum.sending;
        });
        const payload = {...chatMessage};
        // console.log('chat message resend', payload);
        const dateSend = wsMessage.dateToRealm(chatMessage.dateSend);
        const hashKeys = realm.objects(dbEnum.HashKey)
          .sorted('dateSend', true)
          .filtered(`chatId = '${chatMessage.chatId}' AND dateSend < ${dateSend}`);
        if (!hashKeys.length) {
          throw new Error(`hashKeys is empty for chatId = ${chatMessage.chatId}`);
        }
        const encryptTime = hashKeys[0].dateSend;
        const hashKey = hashKeys[0].hashKey;
        await apiChat.sendChatMessage({data: payload, members, timeDead, encryptTime, hashKey});
        dispatch({type: types.RESEND_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.RESEND_FAILURE, error: e});
        throw e;
      }
    };
  },

  edit: (data) => {
    return async dispatch => {
      dispatch({type: types.EDIT});
      try {
        const realm = services.getRealm();
        data.dateUpdate = new Date();
        let chatMessage = {};
        await realm.write(() => {
          chatMessage = realm.create(dbEnum.ChatMessage, data, true);
        });
        const payload = {...chatMessage};
        // console.log('chat message updated', chatMessage);
        // TODO - send updated chat message to members
        dispatch({type: types.EDIT_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.EDIT_FAILURE, error: e});
        throw e;
      }
    };
  },

  delete: (id) => {
    return async dispatch => {
      dispatch({type: types.DELETE});
      try {
        const realm = services.getRealm();
        const chatMessage = realm.objectForPrimaryKey(dbEnum.ChatMessage, id);
        if (!chatMessage) {
          throw new Error('delete failed: chat message is not found');
        }
        await realm.write(() => {
          realm.delete(chatMessage);
        });
        // console.log('chat message deleted', id);
        dispatch({type: types.DELETE_SUCCESS, payload: id});
        return true;
      } catch (e) {
        dispatch({type: types.DELETE_FAILURE, error: e});
        throw e;
      }
    };
  },

  receiveMessage: (message) => {
    return async dispatch => {
      const realm = services.getRealm();
      try {
        const dateNow = new Date();
        const meta = get(message, 'data.meta', null);
        if (!meta) {
          throw new Error('data.meta is null');
        }
        const dataPayload = get(message, 'data.payload', null);
        if (!dataPayload) {
          throw new Error('data.payload is null');
        }
        const error = get(message, 'error', null);
        if (error) {
          throw new Error({type: 'server', error});
        }
        let encryptTime = get(message, 'encrypt_time', null);
        encryptTime = wsMessage.dateSendToRealm(encryptTime);
        const hashKeys = realm.objects(dbEnum.HashKey)
          .filtered(`chatId = '${meta.chatId}' AND dateSend = ${encryptTime}`);
        if (!hashKeys.length || hashKeys.length > 1) {
          throw new Error('hashKey not found or more than one');
        }
        const decryptedData = await wsMessage.decryptChatMessage({
          data: dataPayload,
          hashKey: hashKeys[0].hashKey,
        });
        const messageData = {
          ...decryptedData,
          status: messageEnum.received,
          isOwn: false,
          dateSend: wsMessage.dateSendToDate(decryptedData.dateSend),
          dateCreate: dateNow,
          dateUpdate: dateNow,
        };
        let chatMessage = {};
        await realm.write(() => {
          chatMessage = realm.create(dbEnum.ChatMessage, messageData, true);
        });
        const payload = {...chatMessage};
        // console.log('chat message received', chatMessage);
        // TODO - send delivery report to server and client
        const hashKeyData = {
          chatId: chatMessage.chatId,
          messageId: chatMessage.id,
          hashKey: wsMessage.hashFromMessage(decryptedData),
          dateSend: chatMessage.dateSend,
        };
        await hashKeyAdd(hashKeyData);
        dispatch({type: types.RECEIVE_MESSAGE_SUCCESS, payload});
        return payload;
      } catch (e) {
        if (e.type === 'server') {
          // TODO - find and update message status in DB (message.status = 'error')
          dispatch({type: types.RECEIVE_MESSAGE_FAILURE, error: e.error});
          throw e.error;
        }
        dispatch({type: types.RECEIVE_MESSAGE_FAILURE, error: e});
        throw e;
      }
    };
  },

  receiveMessageStatus: (message) => {
    return async dispatch => {
    };
  },

  sendMedia: (message) => {
    return async dispatch => {
    };
  },
};
