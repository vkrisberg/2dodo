import reducer from '../../utils/reducer';
import {types} from './actions';

const initState = {
  list: [],
  sectionList: [],
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
    publicKey: '',
    dateCreate: null,
    dateUpdate: null,
  },
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
    return {
      ...state,
      list: action.payload,
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
    const list = state.list.filter((item) => item.username !== action.payload.username);
    list.push(action.payload);

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
      loading: true,
      error: null
    };
  },

  [types.UPDATE_PUBKEY_SUCCESS]: (state, action) => {
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
