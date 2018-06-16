import reducer from '../../utils/reducer';
import {types} from './actions';
import {themeEnum} from '../../enums'
import CONFIG from '../../config';

const initState = {
  authorized: false,

  user: {
    username: '', // login@hostname
    nickname: '', // login
    email: '',
    phones: [],
    firstName: '',
    secondName: '',
    bio: '',
    avatar: '', // in base64
    theme: themeEnum.light, // [light, night]
  },

  keys: {
    publicKey: null,
    privateKey: null,
    hashKey: null,
  },

  deviceId: '',
  deviceName: '',
  platform: '',
  hostname: CONFIG.hostname,
  isSecure: CONFIG.isSecure,

  net: {
    info: {type: '', effectiveType: ''},
    connected: true,
  },

  loading: false,
  updating: false,
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
      deviceId: action.payload.deviceId,
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
        username: data.username,
        nickname: data.name,
        email: data.email,
        phones: data.phone ? [data.phone] : [],
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

  [types.NET_UPDATE]: (state, action) => {
    return {
      ...state,
      net: {
        info: action.payload,
        connected: action.payload.type === 'wifi' || action.payload.type === 'cellular',
      },
    };
  },

  [types.THEME_CHANGE]: (state, action) => {
    return {
      ...state,
      user: {
        ...state.user,
        theme: action.payload,
      },
    };
  },

  [types.AVATAR_UPDATE]: (state, action) => {
    return {
      ...state,
      updating: true,
      error: null
    };
  },

  [types.AVATAR_UPDATE_SUCCESS]: (state, action) => {
    return {
      ...state,
      user: {
        ...state.user,
        avatar: action.payload,
      },
      updating: false,
    };
  },

  [types.AVATAR_UPDATE_FAILURE]: (state, action) => {
    return {
      ...state,
      updating: false,
      error: action.error,
    };
  },
});
