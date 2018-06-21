import {validation} from '../../../utils';

export default (values) => {
  const errors = {};

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
