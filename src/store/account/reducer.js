import reducer from '../../utils/reducer';
import {types} from './actions';
import {themeEnum} from '../../enums'
import CONFIG from '../../config';

const initState = {
  authorized: false,

  // profile
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

  // secure keys
  keys: {
    publicKey: null,
    privateKey: null,
    hashKey: null,
  },

  password: '',

  deviceId: '',
  deviceName: '',
  deviceModel: '',
  platform: '',
  pushToken: '',
  hostname: CONFIG.hostname,
  isSecure: CONFIG.isSecure,

  net: {
    info: {type: '', effectiveType: ''},
    connected: true,
  },

  connected: false,
  connecting: false,
  connectionAttempts: 0,
  stopReconnect: false,
  appState: 'active',
  routeName: 'Preload',

  loading: false,
  updating: false,
  logout: null,
  error: null,
  errorRemind: null,
  resetPassword: false,
  setNewPassword: false,
};

export default reducer(initState, {

  [types.UPDATE]: (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  },

  [types.CONNECT]: (state, action) => {
    return {
      ...state,
      ...action.payload,
      connectionAttempts: 0,
      connecting: true,
      connected: false,
      stopReconnect: false,
      error: null
    };
  },

  [types.CONNECT_SUCCESS]: (state, action) => {
    return {
      ...state,
      authorized: true,
      // connectionAttempts: 0,
      connecting: false,
      connected: true,
      // stopReconnect: false,
      error: null,
    };
  },

  [types.CONNECT_FAILURE]: (state, action) => {
    return {
      ...state,
      authorized: false,
      connectionAttempts: 0,
      connecting: false,
      connected: false,
      stopReconnect: false,
      error: action.error.toString(),
    };
  },

  [types.RECONNECT]: (state, action) => {
    return {
      ...state,
      connectionAttempts: state.connectionAttempts + 1,
      connecting: false,
      connected: false,
      error: 'connection failed',
    };
  },

  [types.STOP_RECONNECT]: (state, action) => {
    return {
      ...state,
      connectionAttempts: action.payload,
      connecting: false,
      connected: false,
      stopReconnect: true,
    };
  },

  [types.LOGOUT]: (state, action) => {
    return {
      ...state,
      loading: true,
      logout: true,
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
      connectionAttempts: 0,
      loading: false,
      logout: false,
    };
  },

  [types.LOGOUT_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      logout: false,
      error: action.error.toString(),
    };
  },

  [types.REMIND]: (state, action) => {
    return {
      ...state,
      loading: true,
      errorRemind: null
    };
  },

  [types.REMIND_SUCCESS]: (state, action) => {
    return {
      ...state,
      deviceId: action.payload.deviceId,
      password: action.payload.password,
      pushToken: action.payload.pushToken,
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
      errorRemind: action.error.toString(),
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
      password: data.password,
      pushToken: data.push_token,
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
      error: action.error.toString(),
    };
  },

  [types.RESET_PASSWORD]: (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  },

  [types.RESET_PASSWORD_SUCCESS]: (state, action) => {
    return {
      ...state,
      loading: false,
      resetPassword: action.payload.success,
    };
  },

  [types.RESET_PASSWORD_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error.toString(),
    };
  },

  [types.SET_DEFAULT_RESET_PASSWORD]: (state) => {
    return {
      ...state,
      resetPassword: false,
    };
  },

  [types.SET_NEW_PASSWORD]: (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  },

  [types.SET_NEW_PASSWORD_SUCCESS]: (state, action) => {
    return {
      ...state,
      loading: false,
      setNewPassword: action.payload.success,
    };
  },

  [types.SET_NEW_PASSWORD_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error.toString(),
    };
  },

  [types.SET_DEFAULT_NEW_PASSWORD]: (state) => {
    return {
      ...state,
      setNewPassword: false,
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

  [types.PROFILE_UPDATE]: (state, action) => {
    return {
      ...state,
      updating: true,
      error: null,
    };
  },

  [types.PROFILE_UPDATE_SUCCESS]: (state, action) => {
    return {
      ...state,
      user: action.payload,
      updating: false,
    };
  },

  [types.PROFILE_UPDATE_FAILURE]: (state, action) => {
    return {
      ...state,
      updating: false,
      error: action.error,
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

  [types.THEME_UPDATE]: (state, action) => {
    return {
      ...state,
      updating: true,
      error: null
    };
  },

  [types.THEME_UPDATE_SUCCESS]: (state, action) => {
    return {
      ...state,
      user: {
        ...state.user,
        theme: action.payload,
      },
      updating: false,
    };
  },

  [types.THEME_UPDATE_FAILURE]: (state, action) => {
    return {
      ...state,
      updating: false,
      error: action.error,
    };
  },

  [types.SET_APP_STATE]: (state, action) => {
    return {
      ...state,
      appState: action.payload,
    };
  },

  [types.SET_ROUTE_NAME]: (state, action) => {
    return {
      ...state,
      routeName: action.payload,
    };
  },

  [types.PUSH_TOKEN_UPDATE]: (state, action) => {
    return {
      ...state,
      updating: true,
      error: null,
    };
  },

  [types.PUSH_TOKEN_UPDATE_SUCCESS]: (state, action) => {
    return {
      ...state,
      updating: false,
      pushToken: action.payload,
    };
  },

  [types.PUSH_TOKEN_UPDATE_FAILURE]: (state, action) => {
    return {
      ...state,
      updating: false,
      error: action.error.toString(),
    };
  },
});
