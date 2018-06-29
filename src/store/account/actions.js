import {AsyncStorage} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import {merge} from 'lodash';

import apiAccount from '../../api/account';
import {services} from '../../utils';
import {pgplib, hashlib} from '../../utils/encrypt';
import {storageEnum, dbEnum} from '../../enums';
import CONFIG from '../../config';
import routeEnum from '../../enums/route-enum';

export const types = {
  UPDATE: Symbol('UPDATE'),

  CONNECT: Symbol('CONNECT'),
  CONNECT_SUCCESS: Symbol('CONNECT_SUCCESS'),
  CONNECT_FAILURE: Symbol('CONNECT_FAILURE'),
  RECONNECT: Symbol('RECONNECT'),

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
};

const goToMessagesAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({routeName: routeEnum.Messages})],
});

const goToLoginAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({routeName: routeEnum.Login})],
});

export default {

  update: (data) => {
    return {type: types.UPDATE, payload: data};
  },

  remind: () => {
    return async dispatch => {
      dispatch({type: types.REMIND});
      try {
        //--- TODO - remove after test
        // await AsyncStorage.clear();
        // await AsyncStorage.removeItem(`${CONFIG.storagePrefix}:${storageEnum.authorized}`);
        // await AsyncStorage.removeItem(`${CONFIG.storagePrefix}:${storageEnum.username}`);
        // await AsyncStorage.removeItem(`${CONFIG.storagePrefix}:${storageEnum.password}`);
        //---
        const realm = services.getRealm();
        const authorized = await AsyncStorage.getItem(`${CONFIG.storagePrefix}:${storageEnum.authorized}`);
        const username = await AsyncStorage.getItem(`${CONFIG.storagePrefix}:${storageEnum.username}`);
        const password = await AsyncStorage.getItem(`${CONFIG.storagePrefix}:${storageEnum.password}`);

        if (!authorized || !username || !password) {
          throw new Error('remind failed: user is not authorized');
        }

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
        AsyncStorage.setItem(`${CONFIG.storagePrefix}:${storageEnum.username}`, user.username);
        AsyncStorage.setItem(`${CONFIG.storagePrefix}:${storageEnum.password}`, password);
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
          throw new Error(error);
        }
        // go to Messages when log in
        if (account.connecting) {
          AsyncStorage.setItem(`${CONFIG.storagePrefix}:${storageEnum.authorized}`, 'true');
          navigation.dispatch(goToMessagesAction);
        }

        dispatch({type: types.CONNECT_SUCCESS});
      } catch (e) {
        AsyncStorage.removeItem(`${CONFIG.storagePrefix}:${storageEnum.authorized}`);
        AsyncStorage.removeItem(`${CONFIG.storagePrefix}:${storageEnum.username}`);
        AsyncStorage.removeItem(`${CONFIG.storagePrefix}:${storageEnum.password}`);
        if (!account.connecting) {
          navigation.dispatch(goToLoginAction);
        }
        dispatch({type: types.CONNECT_FAILURE, error: e});
        // throw e;
      }
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
        AsyncStorage.removeItem(`${CONFIG.storagePrefix}:${storageEnum.authorized}`);
        AsyncStorage.removeItem(`${CONFIG.storagePrefix}:${storageEnum.username}`);
        AsyncStorage.removeItem(`${CONFIG.storagePrefix}:${storageEnum.password}`);
        navigation.dispatch(goToLoginAction);
        dispatch({type: types.LOGOUT_SUCCESS});
      } catch (e) {
        dispatch({type: types.LOGOUT_FAILURE, error: e});
        // throw e;
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
        // TODO - parse and apply data.server
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
        return realmAccount;
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
};
