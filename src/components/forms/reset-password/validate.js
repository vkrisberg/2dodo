import {validation} from '../../../utils';

export default values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!validation.emailRegex.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.token) {
    errors.token = 'Required';
  } else if (!validation.tokenRegex.test(values.token)) {
    errors.token = 'TokenRegexpError';
  }

  if (!values.login) {
    errors.login = 'Required';
  } else if (!validation.loginRegex.test(values.login)) {
    errors.login = 'LoginRegexpError';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'PasswordRegexpError';
  }

  return errors;
};