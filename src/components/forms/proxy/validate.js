import {validation} from '../../../utils';

export default (values) => {
  const errors = {};

  if (values.server && !validation.httpsRegex.test(values.server)) {
    errors.server = 'ServerRegexpError';
  }

  if (values.proxy && !validation.proxyRegex.test(values.proxy)) {
    errors.proxy = 'ProxyRegexpError';
  }

  if (values.userName && !validation.nameRegex.test(values.userName)) {
    errors.userName = 'NameRegexpError';
  }

  if (values.password && values.password.length < 6) {
    errors.password = 'PasswordRegexpError';
  }

  return errors;
};
