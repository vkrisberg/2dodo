import reducer from '../../utils/reducer';
import {types} from './actions';
import CONFIG from '../../config';

const initState = {
  authorized: false,

  user: {
    nickname: '', // login
    username: '', // login@hostname
    firstName: '',
    secondName: '',
    email: '',
    avatar: '',
  },

  keys: {
    publicKey: null,
    privateKey: null,
    hashKey: null,
  },

  deviceId: '',
  deviceName: '',
  platform: '',
  hostname: CONFIG.httpHost,

  loading: false,
  error: null,
};

export default reducer(initState, {

  [types.UPDATE]: (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  },

  [types.LOGIN]: (state, action) => {
    return {
      ...state,
      ...action.payload,
      loading: true,
      error: null
    };
  },

  [types.LOGIN_SUCCESS]: (state, action) => {
    return {
      ...state,
      authorized: true,
      loading: false,
    };
  },

  [types.LOGIN_FAILURE]: (state, action) => {
    return {
      ...state,
      authorized: false,
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
      authorized: false,
      user: {
        ...initState.user,
      },
      keys: {
        ...initState.keys,
      },
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
      user: {
        ...action.payload.user,
      },
      keys: {
        ...action.payload.keys,
      },
      loading: false
    };
  },

  [types.REMIND_FAILURE]: (state, action) => {
    return {
      ...state,
      user: {
        ...initState.user,
      },
      keys: {
        ...initState.keys,
      },
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
    const {data} = action;
    const account = {
      user: {
        ...state.user,
        nickname: data.name,
        username: `${data.name}@${state.hostname}`,
        firstName: data.firstName,
        secondName: data.secondName,
        email: data.email,
      },
      keys: {
        publicKey: data.publicKey,
        privateKey: data.privateKey,
        hashKey: data.hashKey,
      }
    };

    return {
      ...state,
      ...account,
      loading: false,
    };
  },

  [types.REGISTER_FAILURE]: (state, action) => {
    const {data} = action;
    let _state = {...state};

    if (data) {
      const account = {
        user: {
          ...state.user,
          nickname: data.name,
          username: `${data.name}@${state.hostname}`,
          firstName: data.firstName,
          secondName: data.secondName,
          email: data.email,
        },
        keys: {
          publicKey: data.publicKey,
          privateKey: data.privateKey,
          hashKey: data.hashKey,
        }
      };
      _state = {
        ...state,
        ...account,
      };
    }

    return {
      ..._state,
      loading: false,
      error: action.error,
    };
  },
});
