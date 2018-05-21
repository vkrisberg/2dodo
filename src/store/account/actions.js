import {AsyncStorage} from 'react-native';
import account from '../../api/account';
import {pgplib, hashlib} from '../../utils/encrypt';
import storageEnum from '../../enums/storage-enum';
import CONFIG from '../../config';
import Realm from 'realm';

export const types = {
  UPDATE: 'UPDATE',

  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',

  LOGOUT: 'LOGOUT',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_FAILURE: 'LOGOUT_FAILURE',

  REMIND: 'REMIND',
  REMIND_SUCCESS: 'REMIND_SUCCESS',
  REMIND_FAILURE: 'REMIND_FAILURE',

  REGISTER: 'REGISTER',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
};

export default {

  update: (data) => {
    return {type: types.UPDATE, payload: data};
  },

  remind: () => {
    return async (dispatch, getState) => {
      dispatch({type: types.REMIND});
      try {
        let user = null, keys = null;
        // await AsyncStorage.clear();
        // await AsyncStorage.removeItem(`${CONFIG.storagePrefix}:${storageEnum.authorized}`);
        // await AsyncStorage.removeItem(`${CONFIG.storagePrefix}:${storageEnum.username}`);
        const authorized = await AsyncStorage.getItem(`${CONFIG.storagePrefix}:${storageEnum.authorized}`);
        const username = await AsyncStorage.getItem(`${CONFIG.storagePrefix}:${storageEnum.username}`);
        if (!authorized || !username) {
          throw new Error('remind failed: user is not authorized');
        }
        // const user = await AsyncStorage.getItem(`${CONFIG.storagePrefix}:${storageEnum.user}`);
        // const keys = await AsyncStorage.getItem(`${CONFIG.storagePrefix}:${storageEnum.keys}`);
        const realm = await Realm.open(CONFIG.realmConfig)
          .then((realm) => {
            return realm;
          })
          .catch((error) => {
            console.log('error connecting to database', error);
            throw new Error('remind failed: error connecting to database');
          });
        const account = realm.objectForPrimaryKey('Account', username);
        if (!account || !account.user || !account.keys) {
          throw new Error('remind failed: user or keys is empty in storage');
        }
        const payload = {
          user: {...account.user},
          keys: {...account.keys},
        };
        dispatch({type: types.REMIND_SUCCESS, payload});
        realm.close();
        return payload;
      } catch (e) {
        dispatch({type: types.REMIND_FAILURE, error: e});
        throw e;
      }
    };
  },

  login: ({deviceId, user, keys, navigation}) => {
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
        const res = await account.registration(data);
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
  }
};
