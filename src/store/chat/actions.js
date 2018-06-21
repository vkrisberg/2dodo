import {get, map, filter} from 'lodash';

import {apiChat, apiServer} from '../../api';
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

const hashKeyAdd = async (data) => {
  const realm = services.getRealm();
  await realm.write(() => {
    realm.create(dbEnum.HashKey, data, true);
  });
  const hashKeys = realm.objects(dbEnum.HashKey)
    .sorted('dateSend')
    .filtered(`chatId = '${data.chatId}'`);
  // console.log('hashKeys', hashKeys);
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

        // TODO - remove after tests
        // await realm.write(() => {
        //   realm.delete(chatList);
        // });

        console.log('chat list loaded', chatList.length);
        const payload = chatList.map((item) => {
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
        if (!contacts || !contacts.length) {
          throw new Error('contacts is empty');
        }
        const members = map(contacts, 'username');
        members.push(account.user.username);
        const sendData = {
          id: wsMessage.generateUuid(),
          owner: account.user.username,
          members,
          salt: wsMessage.generateUuid(),
          dateSend: dateNow,
        };
        const chatData = {
          ...sendData,
          name: map(contacts, 'nickname').join(', '),
          shortName: wsMessage.getShortName(contacts),
          dateCreate: dateNow,
          dateUpdate: dateNow,
        };
        let chat = {};
        await realm.write(() => {
          chat = realm.create(dbEnum.Chat, chatData, false);
        });
        const payload = {...chat};
        // console.log('chat created', chat);
        const apiResult = await apiChat.createChat(sendData, contacts);
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

  delete: (ids) => {
    return async dispatch => {
      dispatch({type: types.DELETE});
      try {
        const realm = services.getRealm();
        let chats = realm.objects(dbEnum.Chat);
        chats = chats.filter((item) => ids.indexOf(item.id) >= 0);

        if (!chats || !chats.length) {
          throw new Error('delete failed: chats are not found');
        }

        await realm.write(() => {
          realm.delete(chats);
        });

        for (let i = 0; i < ids.length; i++) {
          const chatId = ids[i];
          const messages = realm.objects(dbEnum.ChatMessage).filtered(`chatId = '${chatId}'`);
          const hashKeys = realm.objects(dbEnum.HashKey).filtered(`chatId = '${chatId}'`);
          await realm.write(() => {
            realm.delete(messages);
            realm.delete(hashKeys);
          });
        }

        // console.log('chats deleted', ids);
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
        // const chat = realm.objects(dbEnum.Chat); // remove all chats for testing
        const chat = realm.objectForPrimaryKey(dbEnum.Chat, id);

        if (!chat) {
          throw new Error('delete failed: chat is not found');
        }

        await realm.write(() => {
          realm.delete(chat);
        });

        const messages = realm.objects(dbEnum.ChatMessage).filtered(`chatId = '${id}'`);
        const hashKeys = realm.objects(dbEnum.HashKey).filtered(`chatId = '${id}'`);
        await realm.write(() => {
          realm.delete(messages);
          realm.delete(hashKeys);
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
        const meta = get(message, 'data.meta', null);
        if (!meta) {
          throw new Error('data.meta is null');
        }
        const dataPayload = get(message, 'data.payload', null);
        if (!dataPayload) {
          throw new Error('data.payload is null');
        }
        // send delivery report
        const msgEncryptTime =  get(message, 'encrypt_time', null);
        await apiServer.deliveryReport(msgEncryptTime);

        const realmChat = realm.objectForPrimaryKey(dbEnum.Chat, meta.id);
        if (realmChat) {
          throw new Error('chat has already created');
        }

        const decryptedData = await wsMessage.decryptClientMessage({
          data: dataPayload,
          privateKey: account.keys.privateKey,
          password: account.password,
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
          dateSend: wsMessage.rfcToDate(decryptedData.dateSend),
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
