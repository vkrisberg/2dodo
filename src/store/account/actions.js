import account from '../../api/account';

export const types = {
  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',

  LOGOUT: 'LOGOUT',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_FAILURE: 'LOGOUT_FAILURE',

  REMIND: 'REMIND',
  REMIND_SUCCESS: 'REMIND_SUCCESS',
  REMIND_FAILURE: 'REMIND_FAILURE',

  REGISTER: 'REGISTER',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',

};

export default {

  login: (email, password, remember) => {
    return async dispatch => {
      dispatch({type: types.LOGIN});

      try {
        const response = await account.login(email, password, remember);
        const {result} = response.data;
        dispatch({type: types.LOGIN_SUCCESS, payload: result});
        return result;
      } catch (e) {
        if (e.response && e.response.status < 500) {
          dispatch({type: types.LOGIN_FAILURE, error: e.response.data.error});
        } else {
          throw e;
        }
      }
    };
  },

  logout: () => {
    return async dispatch => {
      dispatch({type: types.LOGOUT});

      try {
        const res = await account.logout();
        dispatch({type: types.LOGOUT_SUCCESS});
      } catch (e) {
        if (e.response && e.response.status < 500) {
          dispatch({type: types.LOGOUT_FAILURE, error: e.response.data.error});
        } else {
          throw e;
        }
      }
    };
  },

  remind: () => {
    return async dispatch => {
      dispatch({type: types.REMIND});
      try {
        const res = await account.current();
        dispatch({type: types.REMIND_SUCCESS, payload: res.data.result});
      } catch (e) {
        if (e.response && e.response.status < 500) {
          dispatch({type: types.REMIND_FAILURE, error: e.response.data.error});
        } else {
          throw e;
        }
      }
    };
  },

  register: (data) => {
    return async dispatch => {
      dispatch({ type: types.REGISTER });
      try {
        const res = await account.register(data);
        dispatch({ type: types.REGISTER_SUCCESS, payload: res.data.result });
      } catch(e) {
        if (e.response && e.response.status < 500) {
          dispatch({type: types.REGISTER_FAILURE, error: e.response.data.error});
        } else {
          throw e;
        }
      }
    };
  }
};
