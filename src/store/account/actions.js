import {AsyncStorage} from 'react-native';

import apiAccount from '../../api/account';
import {services, wsMessage} from '../../utils';
import {pgplib, hashlib} from '../../utils/encrypt';
import {storageEnum, dbEnum} from '../../enums';
import CONFIG from '../../config';

export const types = {
  UPDATE: Symbol('UPDATE'),

  LOGIN: Symbol('LOGIN'),
  LOGIN_SUCCESS: Symbol('LOGIN_SUCCESS'),
  LOGIN_FAILURE: Symbol('LOGIN_FAILURE'),

  LOGOUT: Symbol('LOGOUT'),
  LOGOUT_SUCCESS: Symbol('LOGOUT_SUCCESS'),
  LOGOUT_FAILURE: Symbol('LOGOUT_FAILURE'),

  REMIND: Symbol('REMIND'),
  REMIND_SUCCESS: Symbol('REMIND_SUCCESS'),
  REMIND_FAILURE: Symbol('REMIND_FAILURE'),

  REGISTER: Symbol('REGISTER'),
  REGISTER_SUCCESS: Symbol('REGISTER_SUCCESS'),
  REGISTER_FAILURE: Symbol('REGISTER_FAILURE'),

  AVATAR_UPDATE: Symbol('AVATAR_UPDATE'),
  AVATAR_UPDATE_SUCCESS: Symbol('AVATAR_UPDATE_SUCCESS'),
  AVATAR_UPDATE_FAILURE: Symbol('AVATAR_UPDATE_FAILURE'),

  NET_UPDATE: Symbol('NET_UPDATE'),
  THEME_CHANGE: Symbol('THEME_CHANGE'),
};

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
        //---
        const realm = services.getRealm();
        const authorized = await AsyncStorage.getItem(`${CONFIG.storagePrefix}:${storageEnum.authorized}`);
        const username = await AsyncStorage.getItem(`${CONFIG.storagePrefix}:${storageEnum.username}`);
        if (!authorized || !username) {
          throw new Error('remind failed: user is not authorized');
        }

        const account = realm.objectForPrimaryKey(dbEnum.Account, username);
        // console.log('account', account);

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
        dispatch({type: types.REMIND_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.REMIND_FAILURE, error: e});
        throw e;
      }
    };
  },

  login: ({deviceId, user, keys}) => {
    return async dispatch => {
      try {
        dispatch({type: types.LOGIN, payload: {user, keys}});
        // dispatch({type: types.LOGIN_SUCCESS});
      } catch (e) {
        dispatch({type: types.LOGIN_FAILURE, error: e});
        throw e;
      }
    };
  },

  logout: () => {
    return async dispatch => {
      dispatch({type: types.LOGOUT});
      try {
        // dispatch({type: types.LOGOUT_SUCCESS});
      } catch (e) {
        dispatch({type: types.LOGOUT_FAILURE, error: e});
        throw e;
      }
    };
  },

  register: (data) => {
    return async dispatch => {
      dispatch({type: types.REGISTER});
      try {
        const {publicKey, privateKey} = await pgplib.generateKey({name: data.name, email: data.email});
        const hashKey = hashlib.hexSha256(privateKey);
        data.publicKey = publicKey;
        data.privateKey = privateKey;
        data.hashKey = hashKey;
        data.open_key = publicKey;
        data.hash_key = hashKey;
        const res = await apiAccount.registration(data);
        dispatch({type: types.REGISTER_SUCCESS, payload: res.data, data});
        return res.data;
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

  changeTheme: (theme) => {
    return {type: types.THEME_CHANGE, payload: theme};
  },

  updateAvatar: (avatarBase64) => {
    return async (dispatch, getState) => {
      dispatch({type: types.AVATAR_UPDATE});
      try {
        const realm = services.getRealm();
        const {account} = getState();
        const dateNow = new Date();
        const realmAccount = realm.objectForPrimaryKey(dbEnum.Account, account.user.username);
        if (realmAccount) {
          await realm.write(() => {
            realmAccount.user.avatar = avatarBase64;
            realmAccount.dateUpdate = dateNow;
          });
          // console.log('avatar updated', realmAccount);
          // TODO - send avatar to server
        }
        dispatch({type: types.AVATAR_UPDATE_SUCCESS, payload: avatarBase64});
        return realmAccount;
      } catch (e) {
        dispatch({type: types.AVATAR_UPDATE_FAILURE, error: e});
        throw e;
      }
    };
  },
};
