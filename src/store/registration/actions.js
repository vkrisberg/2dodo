import registration from '../../api/registration';

export const types = {
  SIGN_UP: Symbol('SIGN_UP'),
  TOGGLE_SERVER_INPUT: Symbol('TOGGLE_SERVER_INPUT')
  SHOW_EMAIL_AND_PHONE: Symbol('SHOW_EMAIL_AND_PHONE')
};

export default {
  signUp: () => {

  },

  toggleServerInput: () => {
    return async dispatch => {
      dispatch({ type: ''})
    }
  }
}
