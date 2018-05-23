import reducer from '../../utils/reducer';
import {types} from './actions';

const initState = {
  list: [],
  current: {
    username: '', // login@hostname
    nickname: '', // login
    phones: [],
    firstName: '',
    secondName: '',
    bio: '',
    avatar: '',
    sound: '',
    notification: true,
    isBlocked: false,
    settings: '',
    dateCreate: new Date(),
    dateUpdate: new Date(),
  },
  loading: false,
  error: null,
};

export default reducer(initState, {

  [types.LOAD]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null
    };
  },

  [types.LOAD_SUCCESS]: (state, action) => {
    return {
      ...state,
      items: action.payload,
      loading: false,
    };
  },

  [types.LOAD_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  },

  [types.CREATE]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null
    };
  },

  [types.CREATE_SUCCESS]: (state, action) => {
    const items = state.list.map((item) => {
      if (item.username === action.payload.username) {
        return action.payload;
      }
      return item;
    });

    return {
      ...state,
      items,
      loading: false,
    };
  },

  [types.CREATE_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  },

  [types.UPDATE]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null
    };
  },

  [types.UPDATE_SUCCESS]: (state, action) => {
    const items = state.list.map((item) => {
      if (item.username === action.payload.username) {
        return action.payload;
      }
      return item;
    });

    return {
      ...state,
      items,
      loading: false,
    };
  },

  [types.UPDATE_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  },

  [types.DELETE]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null
    };
  },

  [types.DELETE_SUCCESS]: (state, action) => {
    const items = state.list.filter((item) => {
      return item.username !== action.payload;
    });

    return {
      ...state,
      items,
      loading: false,
    };
  },

  [types.DELETE_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  },

  [types.UPDATE_PUBKEY]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null
    };
  },

  [types.UPDATE_PUBKEY_SUCCESS]: (state, action) => {
    const items = state.list.map((item) => {
      if (item.username === action.payload.username) {
        return action.payload;
      }
      return item;
    });

    return {
      ...state,
      items,
      loading: false,
    };
  },

  [types.UPDATE_PUBKEY_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  },


});
