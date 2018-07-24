import reducer from '../../utils/reducer';
import {types} from './actions';
import CONFIG from '../../config';
import {types as groupMessageTypes} from '../group-message/actions';

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
    contacts: [],
    lastMessage: {},
    unreadCount: 0,
    sort: 0,
    pin: 0,
    isMuted: false,
    isDeleted: false,
    isSubscribed: false,
    isBanned: false,
    banReason: '',
    dateBan: null,
    dateCreate: null,
    dateUpdate: null,
  },
  publicList: [], // public group list
  filteredPublicList: [], // filtered public group list
  deleted: [], // array of group ids
  invite: null, // object
  receiveInvite: null, // object
  subscribeLink: null, // string
  unsubscribeLink: null, // string
  member: null, // object
  loading: false,
  getPublicListLoading: false,
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
      error: action.error.toString(),
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
      error: action.error.toString(),
    };
  },

  [types.CREATE]: (state, action) => {
    return {
      ...state,
      current: action.payload,
      loading: true,
      error: null
    };
  },

  [types.CREATE_SUCCESS]: (state, action) => {
    return {
      ...state,
      list: [action.payload, ...state.list],
      current: {},
      loading: false,
    };
  },

  [types.CREATE_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error.toString(),
    };
  },

  [types.UPDATE]: (state, action) => {
    return {
      ...state,
      current: action.payload,
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
      current: {},
      loading: false,
    };
  },

  [types.UPDATE_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error.toString(),
    };
  },

  [types.DELETE]: (state, action) => {
    return {
      ...state,
      deleted: action.payload,
      loading: true,
      error: null
    };
  },

  [types.DELETE_SUCCESS]: (state, action) => {
    const list = state.list.filter((item) => {
      return action.payload.indexOf(item.id) === -1;
    });

    return {
      ...state,
      list,
      deleted: [],
      loading: false,
    };
  },

  [types.DELETE_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error.toString(),
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
      current: action.payload,
      loading: false,
    };
  },

  [types.GET_GROUP_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error.toString(),
    };
  },

  [types.GET_PUBLIC_LIST]: (state, action) => {
    return {
      ...state,
      getPublicListLoading: true,
      error: null
    };
  },

  [types.GET_PUBLIC_LIST_SUCCESS]: (state, action) => {
    return {
      ...state,
      publicList: action.payload,
      filteredPublicList: action.payload,
      getPublicListLoading: false,
    };
  },

  [types.GET_PUBLIC_LIST_FAILURE]: (state, action) => {
    return {
      ...state,
      getPublicListLoading: false,
      error: action.error.toString(),
    };
  },

  [types.FILTER_PUBLIC_GROUP]: (state, action) => {
    if (action.payload) {
      const list = state.publicList.filter(item => item.name.toLowerCase().indexOf(action.payload.toLowerCase()) !== -1);

      return {
        ...state,
        filteredPublicList: list,
        loading: false,
      };
    } else {
      return {
        ...state,
        filteredPublicList: [...state.publicList],
        loading: false,
      };
    }
  },

  [types.INVITE]: (state, action) => {
    return {
      ...state,
      invite: action.payload,
      loading: true,
      error: null
    };
  },

  [types.INVITE_SUCCESS]: (state, action) => {
    return {
      ...state,
      invite: null,
      loading: false,
    };
  },

  [types.INVITE_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error.toString(),
    };
  },

  [types.RECEIVE_INVITE_SUCCESS]: (state, action) => {
    return {
      receiveInvite: action.payload,
      ...state,
    };
  },

  [types.RECEIVE_INVITE_FAILURE]: (state, action) => {
    return {
      ...state,
      error: action.error.toString(),
    };
  },

  [types.SUBSCRIBE]: (state, action) => {
    return {
      ...state,
      subscribeLink: action.payload,
      receiveInvite: null,
      loading: true,
      error: null
    };
  },

  [types.SUBSCRIBE_SUCCESS]: (state, action) => {
    const list = state.list.filter((item) => {
      return item.link !== action.payload.link;
    });

    return {
      ...state,
      list: [action.payload, ...list],
      current: {},
      subscribeLink: null,
      loading: false,
    };
  },

  [types.SUBSCRIBE_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error.toString(),
    };
  },

  [types.UNSUBSCRIBE]: (state, action) => {
    return {
      ...state,
      unsubscribeLink: action.payload,
      loading: true,
      error: null
    };
  },

  [types.UNSUBSCRIBE_SUCCESS]: (state, action) => {
    const list = state.list.map((item) => {
      if (item.id === action.payload.id) {
        return action.payload;
      }
      return item;
    });

    return {
      ...state,
      list,
      unsubscribeLink: null,
      loading: false,
    };
  },

  [types.UNSUBSCRIBE_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error.toString(),
    };
  },

  [types.GET_MEMBER]: (state, action) => {
    return {
      ...state,
      member: null,
      loading: true,
      error: null
    };
  },

  [types.GET_MEMBER_SUCCESS]: (state, action) => {
    return {
      ...state,
      member: action.payload,
      loading: false,
    };
  },

  [types.GET_MEMBER_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error.toString(),
    };
  },

  [types.UPDATE_MEMBER]: (state, action) => {
    return {
      ...state,
      member: action.payload,
      loading: true,
      error: null
    };
  },

  [types.UPDATE_MEMBER_SUCCESS]: (state, action) => {
    return {
      ...state,
      member: null,
      loading: false,
    };
  },

  [types.UPDATE_MEMBER_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error.toString(),
    };
  },

  [types.SET_CURRENT_GROUP]: (state, action) => {
    const list = state.list.map((item) => {
      if (item.id === action.payload.id) {
        return action.payload;
      }
      return item;
    });

    return {
      ...state,
      list,
      current: action.payload,
    };
  },

  [types.UNSET_CURRENT_GROUP]: (state, action) => {
    return {
      ...state,
      current: {...initState.current},
      loading: false,
      error: null
    };
  },

  // Group Message types
  [groupMessageTypes.SEND_SUCCESS]: (state, action) => {
    const list = state.list.map((item) => {
      if (item.id === action.group.id) {
        return action.group;
      }
      return item;
    });

    return {
      ...state,
      list,
    };
  },

  [groupMessageTypes.RECEIVE_MESSAGE_SUCCESS]: (state, action) => {
    let list = [...state.list];
    const index = list.findIndex((item) => item.id === action.group.id);
    if (index >= 0) {
      list[index] = action.group;
    } else {
      list.unshift(action.group);
    }

    return {
      ...state,
      list,
    };
  },
});
