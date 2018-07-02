import {get, map, filter, uniqBy, isEmpty} from 'lodash';

import {apiChat, apiServer} from '../../api';
import {services, wsMessage, helpers} from '../../utils';
import {actionEnum, dbEnum, messageEnum} from '../../enums';
import CONFIG from '../../config';

export const types = {
  LOAD: Symbol('LOAD'),
  LOAD_SUCCESS: Symbol('LOAD_SUCCESS'),
  LOAD_FAILURE: Symbol('LOAD_FAILURE'),

  SEND: Symbol('SEND'),
  SEND_SUCCESS: Symbol('SEND_SUCCESS'),
  SEND_FAILURE: Symbol('SEND_FAILURE'),

  RESEND: Symbol('RESEND'),
  RESEND_SUCCESS: Symbol('RESEND_SUCCESS'),
  RESEND_FAILURE: Symbol('RESEND_FAILURE'),

  EDIT: Symbol('EDIT'),
  EDIT_SUCCESS: Symbol('EDIT_SUCCESS'),
  EDIT_FAILURE: Symbol('EDIT_FAILURE'),

  DELETE: Symbol('DELETE'),
  DELETE_SUCCESS: Symbol('DELETE_SUCCESS'),
  DELETE_FAILURE: Symbol('DELETE_FAILURE'),

  RECEIVE_MESSAGE_SUCCESS: Symbol('RECEIVE_MESSAGE_SUCCESS'),
  RECEIVE_MESSAGE_FAILURE: Symbol('RECEIVE_MESSAGE_FAILURE'),

  SEND_TYPING: Symbol('SEND_TYPING'),
  RECEIVE_TYPING: Symbol('RECEIVE_TYPING'),

  SEND_STATUS: Symbol('SEND_STATUS'),
  RECEIVE_STATUS_SUCCESS: Symbol('RECEIVE_STATUS_SUCCESS'),
  RECEIVE_STATUS_FAILURE: Symbol('RECEIVE_STATUS_FAILURE'),

  SEND_MEDIA: Symbol('SEND_MEDIA'),
  SEND_MEDIA_SUCCESS: Symbol('SEND_MEDIA_SUCCESS'),
  SEND_MEDIA_FAILURE: Symbol('SEND_MEDIA_FAILURE'),

  CLEAR_MESSAGES: Symbol('CLEAR_MESSAGES'),
  CLEAR_MESSAGES_SUCCESS: Symbol('CLEAR_MESSAGES_SUCCESS'),
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

const sendMessageStatus = async ({ids, chatId, members, status}) => {
  const data = {ids, chatId};
  apiChat.sendChatMessageStatus({data, members, status});
};

export default {

  loadList: (chatId = '', filter = '', sort = 'dateCreate', descending = false) => {
    return async dispatch => {
      dispatch({type: types.LOAD});
      try {
        const realm = services.getRealm();
        let messages = realm.objects(dbEnum.ChatMessage)
          .sorted(sort, descending);

        // TODO - remove after tests
        // await realm.write(() => {
        //   realm.delete(messages);
        // });

        if (chatId) {
          messages = messages.filtered(`chatId = '${chatId}'`);
        }
        if (filter) {
          messages = messages.filtered(filter);
        }
        console.log('chat messages loaded', messages.length);
        const payload = messages.map((item) => {
          return JSON.parse(JSON.stringify(item));
        });
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
        let members = filter(chat.members, (username) => username !== account.user.username);
        // when send a message to yourself
        if (!members.length) {
          members = [chat.members[0]];
        }
        const sendData = {
          ...data,
          chatId,
          id: wsMessage.generateUuid(),
          salt: wsMessage.generateUuid(),
          dateSend: dateNow,
        };
        const messageData = {
          ...sendData,
          status: messageEnum.sent,
          isOwn: true,
          dateCreate: dateNow,
          dateUpdate: dateNow,
        };
        let chatMessage = {};
        await realm.write(() => {
          chatMessage = realm.create(dbEnum.ChatMessage, messageData, false);
        });
        const payload = JSON.parse(JSON.stringify(chatMessage));
        // console.log('chat message created', payload);

        // set last message
        const realmChat = realm.objectForPrimaryKey(dbEnum.Chat, chatId);
        if (realmChat) {
          await realm.write(() => {
            realmChat.lastMessage = chatMessage;
            realmChat.dateUpdate = dateNow;
          });
        }
        const chatPayload = {
          ...realmChat,
          lastMessage: {...realmChat.lastMessage}
        };

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
        dispatch({type: types.SEND_SUCCESS, payload, chat: chatPayload});
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
        if (!chatMessage) {
          throw new Error(`chat message '${id}' is not found`);
        }
        const chat = realm.objectForPrimaryKey(dbEnum.Chat, chatMessage.chatId);
        const members = filter(chat.members, (username) => username !== account.user.username);
        await realm.write(() => {
          chatMessage.status = messageEnum.sent;
        });
        const payload = JSON.parse(JSON.stringify(chatMessage));
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
        const payload = JSON.parse(JSON.stringify(chatMessage));
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
    return async (dispatch, getState) => {
      const realm = services.getRealm();
      try {
        // send delivery report
        const msgEncryptTime =  get(message, 'encrypt_time', null);
        await apiServer.deliveryReport(msgEncryptTime);

        const {account, chat} = getState();
        const currentChatId = chat.current.id;
        const dateNow = new Date();
        const from = get(message, 'from', null);
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

        const realmChatMessage = realm.objectForPrimaryKey(dbEnum.ChatMessage, meta.id);
        if (realmChatMessage) {
          throw new Error('chat message has already received');
        }

        const encryptTime = wsMessage.rfcToRealm(msgEncryptTime);
        let hashKeys = realm.objects(dbEnum.HashKey)
          .filtered(`chatId = '${meta.chatId}' AND dateSend = ${encryptTime}`);
        // when send a message to yourself
        hashKeys = uniqBy(hashKeys, 'hashKey');
        // console.log('hashKeys', hashKeys.length, meta.chatId, encryptTime);
        if (!hashKeys.length || hashKeys.length > 1) {
          throw new Error('hashKey not found or more than one');
        }

        const decryptedData = await wsMessage.decryptChatMessage({
          data: dataPayload,
          hashKey: hashKeys[0].hashKey,
        });

        // link contact
        const realmContact = realm.objectForPrimaryKey(dbEnum.Contact, decryptedData.username);

        const messageData = {
          ...decryptedData,
          from,
          contact: realmContact,
          status: currentChatId !== meta.chatId ? messageEnum.received : messageEnum.read,
          isOwn: false,
          dateSend: wsMessage.rfcToDate(decryptedData.dateSend),
          dateCreate: dateNow,
          dateUpdate: dateNow,
        };
        let chatMessage = {};
        await realm.write(() => {
          chatMessage = realm.create(dbEnum.ChatMessage, messageData, true);
        });
        const payload = JSON.parse(JSON.stringify(chatMessage));
        // console.log('chat message received', payload);

        // set last message and increment unreadCount
        const realmChat = realm.objectForPrimaryKey(dbEnum.Chat, meta.chatId);
        if (realmChat) {
          await realm.write(() => {
            if (currentChatId !== meta.chatId) {
              realmChat.unreadCount += 1;
            }
            realmChat.lastMessage = chatMessage;
            realmChat.isDeleted = false;
            realmChat.dateUpdate = dateNow;
          });
        }
        const chatPayload = JSON.parse(JSON.stringify(realmChat));

        // send message status report to clients
        const members = filter(realmChat.members, (username) => username !== account.user.username);
        if (members.length) {
          sendMessageStatus({
            ids: [meta.id],
            chatId: meta.chatId,
            status: chatMessage.status,
            members,
          });
        }

        // create and add hashKey
        const hashKeyData = {
          chatId: chatMessage.chatId,
          messageId: chatMessage.id,
          hashKey: wsMessage.hashFromMessage(decryptedData),
          dateSend: chatMessage.dateSend,
        };
        await hashKeyAdd(hashKeyData);

        dispatch({type: types.RECEIVE_MESSAGE_SUCCESS, payload, chat: chatPayload});
        return payload;
      } catch (e) {
        console.log('chat message received error', e);
        if (e.type === 'server') {
          // TODO - find and update message status in DB (message.status = 'error')
          dispatch({type: types.RECEIVE_MESSAGE_FAILURE, error: e.error});
          throw e.error;
        }
        dispatch({type: types.RECEIVE_MESSAGE_FAILURE, error: e});
        // throw e;
      }
    };
  },

  sendMessageTyping: (chat) => {
    return async (dispatch, getState) => {
      const {account} = getState();
      const members = filter(chat.members, (username) => username !== account.user.username);
      if (members.length) {
        sendMessageStatus({
          ids: [],
          chatId: chat.id,
          status: messageEnum.typing,
          members,
        });
      }
      dispatch({type: types.SEND_TYPING});
    };
  },

  sendMessagesRead: (chat) => {
    return async (dispatch, getState) => {
      const realm = services.getRealm();
      const {account} = getState();
      const dateNow = new Date();
      const chatMessages = realm.objects(dbEnum.ChatMessage)
        .filtered(`chatId = '${chat.id}' AND status = '${messageEnum.received}' AND isOwn = false`)
        .snapshot();
      const members = filter(chat.members, (username) => username !== account.user.username);
      if (members.length && !isEmpty(chatMessages)) {
        const len = chatMessages.length;
        realm.write(() => {
          for (let i = 0; i < len; i++) {
            chatMessages[i].status = messageEnum.read;
            chatMessages[i].dateUpdate = dateNow;
          }
        });
        const messageIds = chatMessages.map((item) => item.id);
        sendMessageStatus({
          ids: messageIds,
          chatId: chat.id,
          status: messageEnum.read,
          members,
        });
      }
      dispatch({type: types.SEND_STATUS});
    };
  },

  receiveMessageStatus: (message) => {
    return async (dispatch, getState) => {
      const realm = services.getRealm();
      try {
        // send delivery report
        const msgEncryptTime =  get(message, 'encrypt_time', null);
        await apiServer.deliveryReport(msgEncryptTime);

        const {chat} = getState();
        const currentChatId = chat.current.id;
        const dateNow = new Date();
        const error = get(message, 'error', null);
        if (error) {
          throw new Error(error);
        }
        const from = get(message, 'from', null);
        if (!from) {
          throw new Error('from is empty');
        }
        const action = get(message, 'action', null);
        if (!action) {
          throw new Error('action is empty');
        }
        const meta = get(message, 'data.meta', null);
        if (!meta) {
          throw new Error('data.meta is empty');
        }

        // typing
        if (action === actionEnum.chatMessageTyping && currentChatId === meta.chatId) {
          const username = wsMessage.getUsername(from);
          const contact = realm.objectForPrimaryKey(dbEnum.Contact, username);
          const name = contact ? helpers.getFullName(contact) : helpers.getNickname(username);
          dispatch({type: types.RECEIVE_TYPING, payload: {name, date: dateNow}});
          return true;
        }

        // status: received or read
        if (!meta.ids || !meta.ids.length || !meta.chatId) {
          return false;
        }
        const status = action === actionEnum.chatMessageRead ? messageEnum.read : messageEnum.received;
        const chatMessages = realm.objects(dbEnum.ChatMessage)
          .filtered(`chatId = '${meta.chatId}' AND isOwn = true`)
          .snapshot();
        const len = chatMessages.length;
        realm.write(() => {
          for (let i = 0; i < len; i++) {
            if (meta.ids.indexOf(chatMessages[i].id) >= 0) {
              chatMessages[i].status = status;
              chatMessages[i].dateUpdate = dateNow;
            }
          }
        });
        const messageIds = chatMessages.map((item) => item.id);
        const payload = {messageIds, status};
        // console.log('message status received', payload);
        dispatch({type: types.RECEIVE_STATUS_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.RECEIVE_STATUS_FAILURE, error: e});
        // throw e;
      }
    };
  },

  sendMedia: (message) => {
    return async dispatch => {
    };
  },

  clearMessages: () => {
    return async dispatch => {
      dispatch({type: types.CLEAR_MESSAGES});
      dispatch({type: types.CLEAR_MESSAGES_SUCCESS});
    };
  },
};
