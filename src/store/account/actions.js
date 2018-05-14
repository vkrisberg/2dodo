import {AsyncStorage} from 'react-native';
import account from '../../api/account';
import {pgplib, hashlib} from '../../utils/encrypt';
import storageEnum from '../../enums/storage-enum';
import CONFIG from '../../config';

const TEST_ACCOUNT = {
  username: 'test@api.2do.do',
  hashKey: '68603d6f4cc29f0575815f10ec31ffbfac43248d7aa781539d7fb52b9ed66e37',
};

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
    return async dispatch => {
      dispatch({type: types.REMIND});
      try {
        // await AsyncStorage.clear();
        const authorized = await AsyncStorage.getItem(`${CONFIG.storagePrefix}:${storageEnum.authorized}`);
        if (!authorized) {
          throw new Error('remind failed: user is not authorized');
        }

        const user = await AsyncStorage.getItem(`${CONFIG.storagePrefix}:${storageEnum.user}`);
        const keys = await AsyncStorage.getItem(`${CONFIG.storagePrefix}:${storageEnum.keys}`);
        if (!user || !keys) {
          throw new Error('remind failed: user or keys is empty in storage');
        }
        const payload = {
          user: JSON.parse(user),
          keys: JSON.parse(keys),
        };

        dispatch({type: types.REMIND_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.REMIND_FAILURE, error: e});
        throw e;
      }
    };
  },

  login: ({deviceId, user, keys, navigation}) => {
    return async dispatch => {
      dispatch({type: types.LOGIN});
      // dispatch({type: types.LOGIN_SUCCESS});
      try {
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
        await AsyncStorage.removeItem(`${CONFIG.storagePrefix}:${storageEnum.authorized}`);
        dispatch({type: types.LOGOUT_SUCCESS});
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
