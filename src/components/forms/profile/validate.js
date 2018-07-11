import {validation} from '../../../utils';

export default (values) => {
  const errors = {};

  if (values.firstName && !validation.nameRegex.test(values.firstName)) {
    errors.firstName = 'NameRegexpError';
  }

  if (values.secondName && !validation.nameRegex.test(values.secondName)) {
    errors.secondName = 'NameRegexpError';
  }

  if (values.bio && !validation.textRegex.test(values.bio)) {
    errors.bio = 'TextRegexpError';
  }
  if (values.phones && values.phones[0] && !validation.phoneRegex.test(values.phones[0])) {
    errors.phones = {0: 'PhoneRegexpError'};
  }

  return errors;
};
