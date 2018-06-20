import reducer from '../../utils/reducer';
import {types} from './actions';
import CONFIG from '../../config';

const initState = {
  list: [],
  current: {
    id: '', // unique chat id (uuid4)
    link: '',
    type: '',
    name: '',
    description: '',
    role: 'member', // member/admin
    hostname: CONFIG.hostname,
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
    isBanned: false,
    banReason: '',
    dateBan: null,
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
    let list = [];

    if (typeof action.payload === 'string') {
      list = state.list.filter((item) => {
        return item.id !== action.payload;
      });
    } else {
      list = state.list.filter((item) => {
        return action.payload.indexOf(item.id) === -1;
      });
    }

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

  [types.GET_GROUP]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null
    };
  },

  [types.GET_GROUP_SUCCESS]: (state, action) => {
    return {
      ...state,
      loading: false,
    };
  },

  [types.GET_GROUP_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  },

  [types.GET_PUBLIC_LIST]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null
    };
  },

  [types.GET_PUBLIC_LIST_SUCCESS]: (state, action) => {
    return {
      ...state,
      loading: false,
    };
  },

  [types.GET_PUBLIC_LIST_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  },

  [types.INVITE]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null
    };
  },

  [types.INVITE_SUCCESS]: (state, action) => {
    return {
      ...state,
      loading: false,
    };
  },

  [types.INVITE_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  },

  [types.SUBSCRIBE]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null
    };
  },

  [types.SUBSCRIBE_SUCCESS]: (state, action) => {
    return {
      ...state,
      loading: false,
    };
  },

  [types.SUBSCRIBE_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  },

  [types.UNSUBSCRIBE]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null
    };
  },

  [types.UNSUBSCRIBE_SUCCESS]: (state, action) => {
    return {
      ...state,
      loading: false,
    };
  },

  [types.UNSUBSCRIBE_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  },

  [types.GET_MEMBER]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null
    };
  },

  [types.GET_MEMBER_SUCCESS]: (state, action) => {
    return {
      ...state,
      loading: false,
    };
  },

  [types.GET_MEMBER_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  },

  [types.UPDATE_MEMBER]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null
    };
  },

  [types.UPDATE_MEMBER_SUCCESS]: (state, action) => {
    return {
      ...state,
      loading: false,
    };
  },

  [types.UPDATE_MEMBER_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  },

  [types.SEND_MESSAGE]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null
    };
  },

  [types.SEND_MESSAGE_SUCCESS]: (state, action) => {
    return {
      ...state,
      loading: false,
    };
  },

  [types.SEND_MESSAGE_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  },

  [types.RECEIVE_INVITE]: (state, action) => {
    return {
      ...state,
    };
  },

  [types.RECEIVE_MESSAGE]: (state, action) => {
    return {
      ...state,
    };
  },

  [types.SET_CURRENT_GROUP]: (state, action) => {
    return {
      ...state,
      current: action.payload,
    };
  },
});
