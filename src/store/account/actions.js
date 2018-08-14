import {AsyncStorage} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import fs from 'react-native-fs';
import {get, merge} from 'lodash';

import apiAccount from '../../api/account';
import {helpers, services} from '../../utils';
import {pgplib, hashlib} from '../../utils/encrypt';
import {storageEnum, dbEnum} from '../../enums';
import CONFIG from '../../config';
import routeEnum from '../../enums/route-enum';
import {apiServer} from "../../api";

export const types = {
  UPDATE: Symbol('UPDATE'),

  CONNECT: Symbol('CONNECT'),
  CONNECT_SUCCESS: Symbol('CONNECT_SUCCESS'),
  CONNECT_FAILURE: Symbol('CONNECT_FAILURE'),
  RECONNECT: Symbol('RECONNECT'),
  STOP_RECONNECT: Symbol('STOP_RECONNECT'),

  LOGOUT: Symbol('LOGOUT'),
  LOGOUT_SUCCESS: Symbol('LOGOUT_SUCCESS'),
  LOGOUT_FAILURE: Symbol('LOGOUT_FAILURE'),

  REMIND: Symbol('REMIND'),
  REMIND_SUCCESS: Symbol('REMIND_SUCCESS'),
  REMIND_FAILURE: Symbol('REMIND_FAILURE'),

  REGISTER: Symbol('REGISTER'),
  REGISTER_SUCCESS: Symbol('REGISTER_SUCCESS'),
  REGISTER_FAILURE: Symbol('REGISTER_FAILURE'),

  PROFILE_UPDATE: Symbol('PROFILE_UPDATE'),
  PROFILE_UPDATE_SUCCESS: Symbol('PROFILE_UPDATE_SUCCESS'),
  PROFILE_UPDATE_FAILURE: Symbol('PROFILE_UPDATE_FAILURE'),

  THEME_UPDATE: Symbol('THEME_UPDATE'),
  THEME_UPDATE_SUCCESS: Symbol('THEME_UPDATE_SUCCESS'),
  THEME_UPDATE_FAILURE: Symbol('THEME_UPDATE_FAILURE'),

  AVATAR_UPDATE: Symbol('AVATAR_UPDATE'),
  AVATAR_UPDATE_SUCCESS: Symbol('AVATAR_UPDATE_SUCCESS'),
  AVATAR_UPDATE_FAILURE: Symbol('AVATAR_UPDATE_FAILURE'),

  NET_UPDATE: Symbol('NET_UPDATE'),

  RESET_PASSWORD: Symbol('RESET_PASSWORD'),
  RESET_PASSWORD_SUCCESS: Symbol('RESET_PASSWORD_SUCCESS'),
  RESET_PASSWORD_FAILURE: Symbol('RESET_PASSWORD_FAILURE'),
  SET_DEFAULT_RESET_PASSWORD: Symbol('SET_DEFAULT_RESET_PASSWORD'),

  SET_NEW_PASSWORD: Symbol('SET_NEW_PASSWORD'),
  SET_NEW_PASSWORD_SUCCESS: Symbol('SET_NEW_PASSWORD_SUCCESS'),
  SET_NEW_PASSWORD_FAILURE: Symbol('SET_NEW_PASSWORD_FAILURE'),
  SET_DEFAULT_NEW_PASSWORD: Symbol('SET_DEFAULT_NEW_PASSWORD'),

  SET_APP_STATE: Symbol('SET_APP_STATE'),
  SET_ROUTE_NAME: Symbol('SET_ROUTE_NAME'),

  PUSH_TOKEN_UPDATE: Symbol('PUSH_TOKEN_UPDATE'),
  PUSH_TOKEN_UPDATE_SUCCESS: Symbol('PUSH_TOKEN_UPDATE_SUCCESS'),
  PUSH_TOKEN_UPDATE_FAILURE: Symbol('PUSH_TOKEN_UPDATE_FAILURE'),
};

const goToMessagesAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({routeName: routeEnum.Messages})],
});

const goToLoginAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({routeName: routeEnum.Login})],
});

const KEY_AUTHORIZED = `${CONFIG.storagePrefix}:${storageEnum.authorized}`;
const KEY_USERNAME = `${CONFIG.storagePrefix}:${storageEnum.username}`;
const KEY_PASSWORD = `${CONFIG.storagePrefix}:${storageEnum.password}`;
const KEY_PUSH_TOKEN = `${CONFIG.storagePrefix}:${storageEnum.pushToken}`;

export default {

  update: (data) => {
    return {type: types.UPDATE, payload: data};
  },

  remind: () => {
    return async dispatch => {
      dispatch({type: types.REMIND});
      try {
        //--- TODO - remove after test
        // await AsyncStorage.removeItem(KEY_AUTHORIZED);
        // await AsyncStorage.removeItem(KEY_USERNAME);
        // await AsyncStorage.removeItem(KEY_PASSWORD);
        // await AsyncStorage.removeItem(KEY_PUSH_TOKEN);
        //---
        const authorized = await AsyncStorage.getItem(KEY_AUTHORIZED);
        const username = await AsyncStorage.getItem(KEY_USERNAME);
        const password = await AsyncStorage.getItem(KEY_PASSWORD);

        if (!authorized || !username || !password) {
          throw new Error('remind failed: user is not authorized');
        }

        // each user his own database
        const realmPath = helpers.getRealmPath(username);
        const realm = await services.realmInit(realmPath);

        const account = realm.objectForPrimaryKey(dbEnum.Account, username);
        // console.log('account', account.keys.publicKey);

        // TODO - remove after test
        // const pubKey = '';
        // const prvKey = '';
        // await realm.write(() => {
        //   const keys = {...account.keys};
        //   keys.publicKey = pubKey;
        //   keys.privateKey = prvKey;
        //   account.keys = keys;
        // });

        if (!account || !account.user || !account.keys) {
          throw new Error('remind failed: user or keys is empty in storage');
        }

        const payload = {...account};
        payload.password = password;
        dispatch({type: types.REMIND_SUCCESS, payload});
        return {...payload, password};
      } catch (e) {
        dispatch({type: types.REMIND_FAILURE, error: e});
        throw e;
      }
    };
  },

  connect: ({deviceId, hostname, user, keys, password}) => {
    return async dispatch => {
      try {
        AsyncStorage.setItem(KEY_USERNAME, user.username);
        AsyncStorage.setItem(KEY_PASSWORD, password);
        services.websocketConnect({
          deviceId,
          hostname,
          username: user.username,
          password,
          hashKey: keys.hashKey,
        });
        dispatch({type: types.CONNECT, payload: {deviceId, hostname, user, keys, password}});
      } catch (e) {
        dispatch({type: types.CONNECT_FAILURE, error: e});
        throw e;
      }
    };
  },

  reconnect: (force = false) => {
    return async (dispatch, getState) => {
      try {
        const {account} = getState();
        const {deviceId, hostname, user, password, keys} = account;

        if (!force && account.connected) {
          return;
        }

        services.websocketConnect({
          deviceId,
          hostname,
          username: user.username,
          password,
          hashKey: keys.hashKey,
        });
        dispatch({type: types.CONNECT, payload: {deviceId, hostname, user, keys, password}});
      } catch (e) {
        dispatch({type: types.CONNECT_FAILURE, error: e});
        throw e;
      }
    };
  },

  connectResult: ({connected, error}) => {
    return async (dispatch, getState) => {
      const {account} = getState();
      const navigation = services.getNavigation();
      try {
        // app in background
        if (account.appState !== 'active') {
          return;
        }
        // login failed
        if (!connected && account.connecting) {
          throw new Error('connect failed: login error');
        }
        // try reconnect when disconnected
        if (!connected && !account.connecting) {
          if (account.connectionAttempts < CONFIG.maxConnectionAttempts) {
            console.log('reconnect...', account.connectionAttempts);
            const {deviceId, hostname, password, user, keys} = account;
            services.websocketConnect({
              deviceId,
              hostname,
              username: user.username,
              password,
              hashKey: keys.hashKey,
            });
            dispatch({type: types.RECONNECT});
            return;
          }
          // connection attempts ended
          if (!account.stopReconnect) {
            throw new Error(error);
          }
          return;
        }
        // go to Messages when log in
        if (account.connecting) {
          AsyncStorage.setItem(KEY_AUTHORIZED, 'true');
          if (!account.errorRemind && account.logout === null) {
            navigation.dispatch(goToMessagesAction);
          }
        }

        dispatch({type: types.CONNECT_SUCCESS});
      } catch (e) {
        AsyncStorage.removeItem(KEY_AUTHORIZED);
        AsyncStorage.removeItem(KEY_USERNAME);
        AsyncStorage.removeItem(KEY_PASSWORD);
        if (!account.connecting) {
          navigation.dispatch(goToLoginAction);
        }
        dispatch({type: types.CONNECT_FAILURE, error: e});
        // throw e;
      }
    };
  },

  stopReconnect: (connectionAttempts = 99) => {
    return async (dispatch) => {
      AsyncStorage.removeItem(KEY_AUTHORIZED);
      AsyncStorage.removeItem(KEY_USERNAME);
      AsyncStorage.removeItem(KEY_PASSWORD);
      dispatch({type: types.STOP_RECONNECT, payload: connectionAttempts});
    };
  },

  logout: () => {
    return async dispatch => {
      dispatch({type: types.LOGOUT});
      try {
        const websocket = services.getWebsocket();
        websocket.close();
      } catch (e) {
        dispatch({type: types.LOGOUT_FAILURE, error: e});
        throw e;
      }
    };
  },

  logoutResult: ({clean, error}) => {
    return async dispatch => {
      try {
        const navigation = services.getNavigation();
        if (!clean) {
          throw new Error(error);
        }
        AsyncStorage.removeItem(KEY_AUTHORIZED);
        AsyncStorage.removeItem(KEY_USERNAME);
        AsyncStorage.removeItem(KEY_PASSWORD);
        dispatch({type: types.LOGOUT_SUCCESS});
        navigation.dispatch(goToLoginAction);
      } catch (e) {
        dispatch({type: types.LOGOUT_FAILURE, error: e});
        // throw e;
      }
    };
  },

  deleteAccount: () => {
    return async dispatch => {
      dispatch({type: types.LOGOUT});
      try {
        const realm = services.getRealm();
        const path = realm.path;
        realm.close();
        await fs.unlink(path);

        const websocket = services.getWebsocket();
        websocket.close();
      } catch (e) {
        dispatch({type: types.LOGOUT_FAILURE, error: e});
        throw e;
      }
    };
  },

  register: (data) => {
    return async (dispatch, getState) => {
      dispatch({type: types.REGISTER});
      try {
        const {account} = getState();
        const {publicKey, privateKey} = await pgplib.generateKey({
          name: data.name,
          email: data.email,
          passphrase: data.password,
        });
        const hashKey = hashlib.hexSha256(privateKey);
        data.publicKey = publicKey;
        data.privateKey = privateKey;
        data.hashKey = hashKey;
        data.open_key = publicKey;
        data.hash_key = hashKey;
        data.username = `${data.name}@${account.hostname}`;
        data.push_token = await AsyncStorage.getItem(KEY_PUSH_TOKEN) || '';
        // TODO - parse and apply data.server
        // console.log('send register data', data);
        const res = await apiAccount.registration(data);
        dispatch({type: types.REGISTER_SUCCESS, payload: res.data, data});
        return data;
      } catch (e) {
        if (e.response && e.response.status < 500) {
          dispatch({type: types.REGISTER_FAILURE, error: e.response.data, data});
        } else {
          dispatch({type: types.REGISTER_FAILURE, error: e.response.data});
        }
        throw e;
      }
    };
  },

  resetPassword: (email, username) => {
    return async (dispatch) => {
      dispatch({type: types.RESET_PASSWORD});
      try {
        const res = await apiAccount.resetPassword({email, username});
        dispatch({type: types.RESET_PASSWORD_SUCCESS, payload: res.data});
        return {email, username};
      } catch (e) {
        dispatch({type: types.RESET_PASSWORD_FAILURE, error: e.response.data});
        throw e;
      }
    };
  },

  setDefaultResetPassword: () => {
    return async (dispatch) => {
      dispatch({type: types.SET_DEFAULT_RESET_PASSWORD});
    };
  },

  setNewPassword: (data) => {
    return async (dispatch) => {
      dispatch({type: types.SET_NEW_PASSWORD});
      try {
        const res = await apiAccount.setNewPassword(data);
        dispatch({type: types.SET_NEW_PASSWORD_SUCCESS, payload: res.data});
        return data;
      } catch (e) {
        dispatch({type: types.SET_NEW_PASSWORD_FAILURE, error: e.response.data});
        throw e;
      }
    };
  },

  setDefaultNewPassword: () => {
    return async (dispatch) => {
      dispatch({type: types.SET_DEFAULT_NEW_PASSWORD});
    };
  },

  netUpdate: (connectionInfo) => {
    return {type: types.NET_UPDATE, payload: connectionInfo};
  },

  updateProfile: (data) => {
    return async (dispatch, getState) => {
      dispatch({type: types.PROFILE_UPDATE});
      try {
        const realm = services.getRealm();
        const {account} = getState();
        const dateNow = new Date();

        const realmAccount = realm.objectForPrimaryKey(dbEnum.Account, account.user.username);
        if (!realmAccount) {
          throw new Error('account not found in database');
        }
        await realm.write(() => {
          realmAccount.user = merge({}, realmAccount.user, data);
          realmAccount.dateUpdate = dateNow;
        });
        const payload = {...realmAccount.user};
        // console.log('profile updated', payload);
        // TODO - send settings to server
        dispatch({type: types.PROFILE_UPDATE_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.PROFILE_UPDATE_FAILURE, error: e});
        throw e;
      }
    };
  },

  updateTheme: (theme) => {
    return async (dispatch, getState) => {
      dispatch({type: types.THEME_UPDATE});
      try {
        const realm = services.getRealm();
        const {account} = getState();
        const dateNow = new Date();

        const realmAccount = realm.objectForPrimaryKey(dbEnum.Account, account.user.username);
        if (!realmAccount) {
          throw new Error('account not found in database');
        }
        await realm.write(() => {
          realmAccount.user.theme = theme;
          realmAccount.dateUpdate = dateNow;
        });
        // console.log('theme updated', realmAccount.user);
        // TODO - send settings to server
        dispatch({type: types.THEME_UPDATE_SUCCESS, payload: theme});
        return realmAccount;
      } catch (e) {
        dispatch({type: types.THEME_UPDATE_FAILURE, error: e});
        throw e;
      }
    };
  },

  updateAvatar: (avatarBase64) => {
    return async (dispatch, getState) => {
      dispatch({type: types.AVATAR_UPDATE});
      try {
        const realm = services.getRealm();
        const {account} = getState();
        const dateNow = new Date();

        const realmAccount = realm.objectForPrimaryKey(dbEnum.Account, account.user.username);
        if (!realmAccount) {
          throw new Error('account not found in database');
        }
        await realm.write(() => {
          realmAccount.user.avatar = avatarBase64;
          realmAccount.dateUpdate = dateNow;
        });
        // console.log('avatar updated', realmAccount.user);
        // TODO - send settings to server
        dispatch({type: types.AVATAR_UPDATE_SUCCESS, payload: avatarBase64});
        return realmAccount;
      } catch (e) {
        dispatch({type: types.AVATAR_UPDATE_FAILURE, error: e});
        throw e;
      }
    };
  },

  setAppState: (state) => {
    return {type: types.SET_APP_STATE, payload: state};
  },

  setRouteName: (routeName) => {
    return {type: types.SET_ROUTE_NAME, payload: routeName};
  },

  updatePushToken: (token = null) => {
    return async (dispatch, getState) => {
      dispatch({type: types.PUSH_TOKEN_UPDATE});
      try {
        const realm = services.getRealm();
        const {account} = getState();
        const dateNow = new Date();

        const _token = token || await AsyncStorage.getItem(KEY_PUSH_TOKEN);
        if (!_token) {
          throw new Error('push token is null');
        }

        const realmAccount = realm.objectForPrimaryKey(dbEnum.Account, account.user.username);
        if (!realmAccount) {
          throw new Error('account not found in database');
        }

        if (!realmAccount.pushToken || realmAccount.pushToken !== _token) {
          await realm.write(() => {
            realmAccount.pushToken = _token;
            realmAccount.dateUpdate = dateNow;
          });
          await apiServer.updatePushToken(_token);
          console.log('push token updated and sent', _token);
        }

        dispatch({type: types.PUSH_TOKEN_UPDATE_SUCCESS, payload: _token});
        return _token;
      } catch (e) {
        dispatch({type: types.PUSH_TOKEN_UPDATE_FAILURE, error: e});
        throw e;
      }
    };
  },

  updatePushTokenResult: (message) => {
    return async (dispatch) => {
      // send delivery report
      const msgEncryptTime =  get(message, 'encrypt_time', null);
      await apiServer.deliveryReport(msgEncryptTime);

      if (message.error) {
        dispatch({type: types.PUSH_TOKEN_UPDATE_FAILURE, error: message.error});
      }
    };
  },
};
