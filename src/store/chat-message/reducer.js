import reducer from '../../utils/reducer';
import {types} from './actions';
import {types as chatTypes} from '../chat/actions';

const initState = {
  chat: '', // current chat
  list: [],
  current: {
    id: '',
    chatId: '',
    type: 'text', // [text, audio, video, image, call]
    username: '',
    from: '',
    text: '',
    fileUrl: '',
    user: {},
    quote: {},
    status: 'sending', // [sending, send, received, read, error]
    isOwn: false,
    isFavorite: false,
    salt: '',
    dateSend: null,
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

  [types.SEND]: (state, action) => {
    return {
      ...state,
      current: {...initState.current},
      loading: true,
      error: null
    };
  },

  [types.SEND_SUCCESS]: (state, action) => {
    return {
      ...state,
      list: [...state.list, action.payload],
      loading: false,
    };
  },

  [types.SEND_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  },

  [types.RESEND]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null
    };
  },

  [types.RESEND_SUCCESS]: (state, action) => {
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

  [types.RESEND_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  },

  [types.EDIT]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null
    };
  },

  [types.EDIT_SUCCESS]: (state, action) => {
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

  [types.EDIT_FAILURE]: (state, action) => {
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

  [types.RECEIVE_MESSAGE_SUCCESS]: (state, action) => {
    if (action.payload.chatId !== state.chat.id) {
      return state;
    }

    return {
      ...state,
      list: [...state.list, action.payload],
      receiveError: null,
    };
  },

  [types.RECEIVE_MESSAGE_FAILURE]: (state, action) => {
    return {
      ...state,
      receiveError: action.error,
    };
  },

  [types.RECEIVE_STATUS_SUCCESS]: (state, action) => {
    return {
      ...state,
      receiveError: null,
    };
  },

  [types.RECEIVE_STATUS_FAILURE]: (state, action) => {
    return {
      ...state,
      receiveError: action.error,
    };
  },

  // Chat types
  [chatTypes.SET_CURRENT_CHAT]: (state, action) => {
    return {
      ...state,
      chat: action.payload,
      list: action.clearMessages ? [] : state.list,
    };
  },
});
