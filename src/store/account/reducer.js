import reducer from '../../utils/reducer';
import {types} from './actions.js';

const initState = {
  user: {
    name: '',
    email: '',
    avatar: '',
  },

  isAuth: false,
  username: '',
  publicKey: null,
  privateKey: null,
  hashKey: null,
  deviceId: '',
  deviceName: '',
  platform: '',

  loading: false,
  error: null,
};

export default reducer(initState, {

  [types.INIT]: (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  },

  [types.LOGIN]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null
    };
  },

  [types.LOGIN_SUCCESS]: (state, action) => {
    return {
      ...state,
      loading: false,
    };
  },

  [types.LOGIN_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  },

  [types.LOGOUT]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null
    };
  },

  [types.LOGOUT_SUCCESS]: (state, action) => {
    return {
      ...state,
      user: {},
      username: '',
      publicKey: null,
      privateKey: null,
      hashKey: null,
      loading: false
    };
  },

  [types.LOGOUT_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  },

  [types.REMIND]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null
    };
  },

  [types.REMIND_SUCCESS]: (state, action) => {
    return {
      ...state,
      username: action.payload.username,
      publicKey: action.payload.publicKey,
      privateKey: action.payload.privateKey,
      hashKey: action.payload.hashKey,
      loading: false
    };
  },

  [types.REMIND_FAILURE]: (state, action) => {
    return {
      ...state,
      username: '',
      publicKey: null,
      privateKey: null,
      hashKey: null,
      loading: false,
      error: action.error,
    };
  },

  [types.REGISTER]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  },

  [types.REGISTER_SUCCESS]: (state, action) => {
    return {
      ...state,
      loading: false,
    };
  },

  [types.REGISTER_FAILURE]: (state, action) => {
    return {
      ...state,
      registerSuccess: false,
      loading: false,
      error: action.error,
    };
  }
});
