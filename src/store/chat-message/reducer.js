import reducer from '../../utils/reducer';
import {types} from './actions';

const initState = {
  list: [],
  current: {
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

  [types.RECEIVE_MESSAGE_SUCCESS]: (state, action) => {
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
});
