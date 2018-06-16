import {validation} from '../../../utils';

export default (values) => {
  const errors = {};

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

  if (!values.repeatPassword) {
    errors.repeatPassword = 'Required';
  } else if (values.repeatPassword.length < 6) {
    errors.repeatPassword = 'PasswordRegexpError';
  } else if (values.password !== values.repeatPassword) {
    errors.repeatPassword = 'RepeatPasswordNotMatch';
  }

  if (values.server && !validation.httpsRegex.test(values.server)) {
    errors.server = 'ServerRegexpError';
  }

  if (values.page === 1 && !values.email) {
    errors.email = 'Required';
  } else if (values.page === 1 && !validation.emailRegex.test(values.email)) {
    errors.email = 'EmailRegexpError';
  }

  if (values.page === 1 && values.phone && !validation.phoneRegex.test(values.phone)) {
    errors.phone = 'PhoneRegexpError';
  }

  return errors;
};
