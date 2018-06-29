import {get} from 'lodash';

import {apiContact, apiServer} from '../../api';
import {services, wsMessage} from '../../utils';
import {dbEnum, messageEnum, routeEnum} from '../../enums';
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

  UPDATE_PUBKEY: Symbol('UPDATE_PUBKEY'),
  UPDATE_PUBKEY_SUCCESS: Symbol('UPDATE_PUBKEY_SUCCESS'),
  UPDATE_PUBKEY_FAILURE: Symbol('UPDATE_PUBKEY_FAILURE'),

  RECEIVE_PUBKEY_SUCCESS: Symbol('RECEIVE_PUBKEY_SUCCESS'),
  RECEIVE_PUBKEY_FAILURE: Symbol('RECEIVE_PUBKEY_FAILURE'),

  SEARCH: Symbol('SEARCH'),
  SEARCH_SUCCESS: Symbol('SEARCH_SUCCESS'),
  SEARCH_FAILURE: Symbol('SEARCH_FAILURE'),

  CLEAR_SEARCH_LIST: Symbol('CLEAR_SEARCH_LIST'),

  REQUEST_PROFILE: Symbol('REQUEST_PROFILE'),
  RECEIVE_REQUEST_PROFILE: Symbol('RECEIVE_REQUEST_PROFILE'),

  SEND_PROFILE: Symbol('SEND_PROFILE'),

  RECEIVE_PROFILE_SUCCESS: Symbol('RECEIVE_PROFILE_SUCCESS'),
  RECEIVE_PROFILE_FAILURE: Symbol('RECEIVE_PROFILE_FAILURE'),

  GET_ONLINE_USERS: Symbol('GET_ONLINE_USERS'),

  RECEIVE_ONLINE_USERS_SUCCESS: Symbol('RECEIVE_ONLINE_USERS_SUCCESS'),
  RECEIVE_ONLINE_USERS_FAILURE: Symbol('RECEIVE_ONLINE_USERS_FAILURE'),

  SET_CURRENT_CONTACT: Symbol('SET_CURRENT_CONTACT'),
};

const linkContact = async (username) => {
  const realm = services.getRealm();
  const contact = realm.objectForPrimaryKey(dbEnum.Contact, username);
  if (!contact) {
    return;
  }
  // link to chats
  const chats = realm.objects(dbEnum.Chat)
    .snapshot();
  let count = chats.length;
  await realm.write(() => {
    for (let i = 0; i < count; i++) {
      const isMember = chats[i].members.indexOf(contact.username) >= 0;
      if (isMember) {
        const exist = chats[i].contacts && chats[i].contacts.find((item) => item.username === contact.username);
        if (!exist) {
          chats[i].contacts.push(contact);
          if (chats[i].members.length === 2) {
            chats[i].avatar = contact.avatar;
          }
        }
      }
    }
  });
  // link to messages
  const chatMessages = realm.objects(dbEnum.ChatMessage)
    .filtered(`username = '${contact.username}'`)
    .snapshot();
  count = chatMessages.length;
  await realm.write(() => {
    for (let i = 0; i < count; i++) {
      if (!chatMessages[i].contact) {
        chatMessages[i].contact = contact;
      }
    }
  });
};

export default {

  loadList: (filter = '', sort = 'username', descending = false) => {
    return async dispatch => {
      dispatch({type: types.LOAD});
      try {
        const realm = services.getRealm();
        let contacts = realm.objects(dbEnum.Contact)
          .sorted(sort, descending);

        // TODO - remove after tests
        // await realm.write(() => {
        //   realm.delete(contacts);
        // });

        if (filter) {
          contacts = contacts.filtered(filter);
        }
        const payload = contacts.map((item) => {
          return {
            ...item,
            fullName: item.fullName,
          };
        });
        // get online users request
        const usernames = contacts.map((item) => item.username);
        await apiContact.getOnlineUsers(usernames);
        console.log('contacts loaded', payload.length);
        dispatch({type: types.LOAD_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.LOAD_FAILURE, error: e});
        throw e;
      }
    };
  },

  loadOne: (username) => {
    return async dispatch => {
      dispatch({type: types.LOAD_ONE});
      try {
        const realm = services.getRealm();
        const contact = realm.objectForPrimaryKey(dbEnum.Contact, username);
        // console.log('contact loaded', contact);
        const payload = {
          ...contact,
          fullName: contact.fullName,
        };
        dispatch({type: types.LOAD_ONE_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.LOAD_ONE_FAILURE, error: e});
        throw e;
      }
    };
  },

  create: (data) => {
    return async dispatch => {
      dispatch({type: types.CREATE});
      try {
        const realm = services.getRealm();
        // get public key when contact exist
        const realmContact = realm.objectForPrimaryKey(dbEnum.Contact, data.username);
        if (realmContact) {
          apiContact.getOpenKey([data.username]);
          dispatch({type: types.CREATE_SUCCESS, payload: null});
          return {
            ...realmContact,
            fullName: realmContact.fullName,
          };
        }
        // create new contact
        data.dateCreate = new Date();
        data.dateUpdate = data.dateCreate;
        let contact = {};
        await realm.write(() => {
          contact = realm.create(dbEnum.Contact, data, false);
        });
        const payload = {
          ...contact,
          fullName: contact.fullName,
        };
        apiContact.getOpenKey([payload.username]);
        // link contact
        linkContact(contact.username);
        // console.log('contact created', payload);
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
        let contact = {};
        await realm.write(() => {
          contact = realm.create(dbEnum.Contact, data, true);
        });
        const payload = {
          ...contact,
          fullName: contact.fullName,
        };
        // console.log('contact updated', payload);
        dispatch({type: types.UPDATE_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.UPDATE_FAILURE, error: e});
        throw e;
      }
    };
  },

  delete: (username) => {
    return async dispatch => {
      dispatch({type: types.DELETE});
      try {
        const realm = services.getRealm();
        const contact = realm.objectForPrimaryKey(dbEnum.Contact, username);
        if (!contact) {
          throw new Error('delete failed: contact is not found');
        }
        await realm.write(() => {
          realm.delete(contact);
        });
        // console.log('contact deleted', username);
        dispatch({type: types.DELETE_SUCCESS, payload: username});
        return true;
      } catch (e) {
        dispatch({type: types.DELETE_FAILURE, error: e});
        throw e;
      }
    };
  },

  updatePublicKey: (username) => {
    return async dispatch => {
      dispatch({type: types.UPDATE_PUBKEY});
      try {
        const realm = services.getRealm();
        const dateNow = new Date();
        let contact = realm.objectForPrimaryKey(dbEnum.Contact, username);
        if (!contact) {
          const data = {
            username,
            nickname: wsMessage.getNickname(username),
            dateCreate: dateNow,
            dateUpdate: dateNow,
          };
          await realm.write(() => {
            contact = realm.create(dbEnum.Contact, data, true);
          });
        }
        const payload = {
          ...contact,
          fullName: contact.fullName,
        };
        // console.log('contact created', payload);
        apiContact.getOpenKey([username]);
        dispatch({type: types.UPDATE_PUBKEY_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.UPDATE_PUBKEY_FAILURE, error: e});
        throw e;
      }
    };
  },

  receivePublicKey: (message) => {
    return async dispatch => {
      try {
        const realm = services.getRealm();
        const contacts = [];

        if (message.error) {
          throw new Error(message.error);
        }

        if (!message.data || !message.data.length) {
          throw new Error('no data');
        }

        for (let i = 0; i < message.data.length; i++) {
          const item = message.data[i];

          const contact = realm.objectForPrimaryKey(dbEnum.Contact, item.name);
          if (contact) {
            await realm.write(() => {
              contact.dateUpdate = new Date();
              contact.publicKey = item.open_key;
            });
            // console.log('contact publicKey updated', contact.username);
            contacts.push({
              ...contact,
              fullName: contact.fullName,
            });
          }
        }
        dispatch({type: types.RECEIVE_PUBKEY_SUCCESS, payload: contacts});
        return contacts;
      } catch (e) {
        dispatch({type: types.RECEIVE_PUBKEY_FAILURE, error: e});
        // throw e;
      }
    };
  },

  search: (username) => {
    return async dispatch => {
      if (!username) {
        dispatch({type: types.SEARCH_SUCCESS, payload: []});
        return [];
      }
      dispatch({type: types.SEARCH});
      try {
        return await apiContact.search(username);
      } catch (e) {
        dispatch({type: types.SEARCH_FAILURE, error: e});
        throw e;
      }
    };
  },

  searchResult: (message) => {
    return async (dispatch, getState) => {
      const {account} = getState();
      const {username} = account.user;

      if (message.error) {
        dispatch({type: types.SEARCH_FAILURE, error: message.error});
      }

      let payload = get(message, 'data', []) || [];
      payload = payload.filter((item) => item !== username);
      payload = payload.map((item) => {
        return {
          username: item,
          nickname: item.split('@')[0],
        };
      });
      // console.log('search contacts result', payload);

      dispatch({type: types.SEARCH_SUCCESS, payload});
      return payload;
    };
  },

  clearSearchList: () => {
    return {type: types.CLEAR_SEARCH_LIST};
  },

  requestProfile: (username) => {
    return async dispatch => {
      dispatch({type: types.REQUEST_PROFILE, payload: username});
      try {
        if (!username) {
          return false;
        }
        return await apiContact.requestProfile([username]);
      } catch (e) {
        console.log('request profile error', e);
      }
    };
  },

  receiveRequestProfile: (message) => {
    return async dispatch => {
      try {
        // send delivery report
        const msgEncryptTime = get(message, 'encrypt_time', null);
        await apiServer.deliveryReport(msgEncryptTime);

        const navigation = services.getNavigation();
        const from = get(message, 'from', '');
        const username = wsMessage.getUsername(from);
        if (!username) {
          return false;
        }
        dispatch({type: types.RECEIVE_REQUEST_PROFILE, payload: username});
        navigation.navigate(routeEnum.RequestProfileModal);
        return username;
      } catch (e) {
        console.log('receive request profile error', e);
      }
    };
  },

  sendProfile: (contacts) => {
    return async (dispatch, getState) => {
      dispatch({type: types.SEND_PROFILE, payload: contacts});
      try {
        const {account} = getState();
        // TODO - send avatar when backend fixed
        const {phones, firstName, secondName, bio} = account.user;
        if (!contacts || !contacts.length) {
          return false;
        }
        return await apiContact.sendProfile({
          data: {phones, firstName, secondName, bio},
          contacts,
        });
      } catch (e) {
        console.log('send profile error', e);
      }
    };
  },

  receiveProfile: (message) => {
    return async (dispatch, getState) => {
      try {
        const realm = services.getRealm();
        const {account} = getState();
        const dateNow = new Date();

        // send delivery report
        const msgEncryptTime = get(message, 'encrypt_time', null);
        await apiServer.deliveryReport(msgEncryptTime);

        if (message.error) {
          throw new Error(message.error);
        }

        const dataPayload = get(message, 'data.payload', null);
        if (!dataPayload) {
          throw new Error('receive profile error: data.payload is empty');
        }

        const decryptedData = await wsMessage.decryptClientMessage({
          data: dataPayload,
          privateKey: account.keys.privateKey,
          password: account.password,
        });

        const from = get(message, 'from', '');
        const username = wsMessage.getUsername(from);
        if (!username) {
          throw new Error('receive profile error: username is empty');
        }

        let contact = realm.objectForPrimaryKey(dbEnum.Contact, username);
        let contactData = {};
        if (contact) {
          contactData = {...contact, dateUpdate: dateNow};
        } else {
          contactData = {
            username,
            nickname: wsMessage.getNickname(username),
            dateCreate: dateNow,
            dateUpdate: dateNow,
          };
        }

        const {phones, firstName, secondName, bio, avatar} = decryptedData;
        contactData = {...contactData, phones, firstName, secondName, bio, avatar};

        await realm.write(() => {
          contact = realm.create(dbEnum.Contact, contactData, true);
        });

        const payload = {
          ...contact,
          fullName: contact.fullName,
        };
        // console.log('contact profile updated', payload);
        dispatch({type: types.RECEIVE_PROFILE_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.RECEIVE_PROFILE_FAILURE, error: e});
        // throw e;
      }
    };
  },

  getOnlineUsers: (usernames = []) => {
    return async (dispatch, getState) => {
      try {
        const {contact} = getState();
        if (!usernames || !usernames.length) {
          usernames = contact.list.map((item) => item.username);
        }
        // console.log('get online users', usernames);
        await apiContact.getOnlineUsers(usernames);
        dispatch({type: types.GET_ONLINE_USERS, payload: usernames});
        return usernames;
      } catch (e) {
        console.log('get online users error', e);
      }
    };
  },

  receiveOnlineUsers: (message) => {
    return async (dispatch, getState) => {
      try {
        // send delivery report
        const msgEncryptTime = get(message, 'encrypt_time', null);
        await apiServer.deliveryReport(msgEncryptTime);

        if (message.error) {
          throw new Error(message.error);
        }

        const payload = get(message, 'data', null);
        // console.log('get online users result', payload);
        dispatch({type: types.RECEIVE_ONLINE_USERS_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.RECEIVE_ONLINE_USERS_FAILURE, error: e});
        // throw e;
      }
    };
  },

  setCurrent: (data) => {
    return ({type: types.SET_CURRENT_CONTACT, payload: data});
  },
};
