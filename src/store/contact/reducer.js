import {sortBy} from 'lodash';
import reducer from '../../utils/reducer';
import {types} from './actions';
import {types as chatTypes} from '../chat/actions';

const initState = {
  list: [],
  sectionList: [],
  searchList: [],
  current: {
    username: '', // login@hostname
    nickname: '', // login
    deviceId: '',
    groups: [],
    phones: [],
    firstName: '',
    secondName: '',
    bio: '',
    avatar: '',
    sound: '',
    notification: true,
    isBlocked: false,
    settings: '',
    publicKey: '',
    dateCreate: null,
    dateUpdate: null,
    isOnline: false,
    inContacts: false, // for searchList
  },
  updatePubKey: null,
  requestProfile: null,
  receiveRequestProfile: null,
  sendProfile: null,
  getOnlineUsers: null,
  loading: false,
  error: null,
};

function getSectionList(list) {
  const sectionList = [];

  list.forEach((contact) => {
    const title = contact.nickname[0].toUpperCase();
    const index = sectionList.findIndex((item) => item.title === title);
    if (index >= 0) {
      sectionList[index].data.push(contact);
    } else {
      sectionList.push({title, data: [contact]});
    }
  });

  return sectionList;
}

export default reducer(initState, {

  [types.LOAD]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null
    };
  },

  [types.LOAD_SUCCESS]: (state, action) => {
    const list = sortBy(action.payload, ['firstName', 'secondName', 'username']);

    return {
      ...state,
      list,
      sectionList: getSectionList(action.payload),
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
    if (!action.payload) {
      return {
        ...state,
        loading: false,
      };
    }

    let list = state.list.filter((item) => item.username !== action.payload.username);
    list.push(action.payload);
    list = sortBy(list, ['firstName', 'secondName', 'username']);

    return {
      ...state,
      list,
      sectionList: getSectionList(list),
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
      if (item.username === action.payload.username) {
        return action.payload;
      }
      return item;
    });

    return {
      ...state,
      list,
      sectionList: getSectionList(list),
      current: action.payload,
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
      return item.username !== action.payload;
    });

    return {
      ...state,
      list,
      sectionList: getSectionList(list),
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
      updatePubKey: null,
      error: null
    };
  },

  [types.UPDATE_PUBKEY_SUCCESS]: (state, action) => {
    const list = state.list.filter((item) => item.username !== action.payload.username);
    list.push(action.payload);

    return {
      ...state,
      list,
      sectionList: getSectionList(list),
    };
  },

  [types.UPDATE_PUBKEY_FAILURE]: (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  },

  [types.RECEIVE_PUBKEY_SUCCESS]: (state, action) => {
    const list = state.list.map((item) => {
      const findContact = action.payload.find((contact) => contact.username === item.username);
      if (findContact) {
        return findContact;
      }
      return item;
    });

    return {
      ...state,
      list,
      sectionList: getSectionList(list),
      updatePubKey: action.payload[0],
    };
  },

  [types.RECEIVE_PUBKEY_FAILURE]: (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  },

  [types.SEARCH]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null
    };
  },

  [types.SEARCH_SUCCESS]: (state, action) => {
    const searchList = action.payload.map((item) => {
      const inContacts = state.list.find((contact) => contact.username === item.username);
      item.inContacts = !!inContacts;
      return item;
    });

    return {
      ...state,
      searchList,
      loading: false,
    };
  },

  [types.SEARCH_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  },

  [types.CLEAR_SEARCH_LIST]: (state, action) => {
    return {
      ...state,
      searchList: [],
    };
  },

  [types.REQUEST_PROFILE]: (state, action) => {
    return {
      ...state,
      requestProfile: action.payload,
    };
  },

  [types.RECEIVE_REQUEST_PROFILE]: (state, action) => {
    return {
      ...state,
      receiveRequestProfile: action.payload,
    };
  },

  [types.CLEAR_RECEIVE_PROFILE]: (state, action) => {
    return {
      ...state,
      receiveRequestProfile: null,
    };
  },

  [types.SEND_PROFILE]: (state, action) => {
    return {
      ...state,
      sendProfile: action.payload,
      receiveRequestProfile: null,
    };
  },

  [types.RECEIVE_PROFILE_SUCCESS]: (state, action) => {
    const list = state.list.map((item) => {
      if (item.username === action.payload.username) {
        return action.payload;
      }
      return item;
    });

    return {
      ...state,
      list,
      sectionList: getSectionList(list),
      requestProfile: null,
    };
  },

  [types.RECEIVE_PROFILE_FAILURE]: (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  },

  [types.GET_ONLINE_USERS]: (state, action) => {
    return {
      ...state,
      getOnlineUsers: action.payload,
    };
  },

  [types.RECEIVE_ONLINE_USERS_SUCCESS]: (state, action) => {
    const onlineUsers = action.payload ? action.payload.map((item) => item.name) : [];
    const list = state.list.map((item) => {
      if (onlineUsers.indexOf(item.username) >= 0) {
        item.isOnline = true;
      }
      return item;
    });
    // set current - to show in the chat-message screen on navbar
    let current = state.current || {...initState.current};
    current.isOnline = onlineUsers.indexOf(current.username) >= 0;

    return {
      ...state,
      list,
      current,
      sectionList: getSectionList(list),
      getOnlineUsers: null,
    };
  },

  [types.RECEIVE_ONLINE_USERS_FAILURE]: (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  },

  [types.SET_CURRENT_CONTACT]: (state, action) => {
    return {
      ...state,
      current: action.payload,
    };
  },

  // Chat types
  [chatTypes.SET_CURRENT_CHAT]: (state, action) => {
    let contact = {};
    const {contacts} = action.payload;
    if (contacts && contacts[0]) {
      contact = state.list.find((item) => item.username === contacts[0].username);
    }

    return {
      ...state,
      current: contact || {...initState.current},
    };
  },
});
