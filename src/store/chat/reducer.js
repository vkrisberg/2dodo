import reducer from '../../utils/reducer';
import {types} from './actions';

const initState = {
  list: [],
  current: {
    id: '', // unique chat id (uuid4)
    name: '',
    owner: '',
    members: [],
    shortName: '',
    avatar: '',
    lastMessage: {},
    unreadCount: 0,
    sort: 0,
    pin: 0,
    isMuted: false,
    isDeleted: false,
    dateCreate: null,
    dateUpdate: null,
  },
  loading: false,
  error: null,
  receiveError: null,
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
      list: action.payload,
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

  [types.LOAD_ONE]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null
    };
  },

  [types.LOAD_ONE_SUCCESS]: (state, action) => {
    return {
      ...state,
      current: action.payload,
      loading: false,
    };
  },

  [types.LOAD_ONE_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  },

  [types.CREATE]: (state, action) => {
    return {
      ...state,
      current: {...initState.current},
      loading: true,
      error: null
    };
  },

  [types.CREATE_SUCCESS]: (state, action) => {
    return {
      ...state,
      list: [action.payload, ...state.list],
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
    const list = state.list.map((item) => {
      if (item.id === action.payload.id) {
        return action.payload;
      }
      return item;
    });

    return {
      ...state,
      list,
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
    const list = state.list.filter((item) => {
      return item.id !== action.payload;
    });

    return {
      ...state,
      list,
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

  [types.RECEIVE_CHAT_SUCCESS]: (state, action) => {
    return {
      ...state,
      list: [action.payload, ...state.list],
      receiveError: null,
    };
  },

  [types.RECEIVE_CHAT_FAILURE]: (state, action) => {
    return {
      ...state,
      receiveError: action.error,
    };
  },
});
