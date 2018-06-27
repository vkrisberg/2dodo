import {validation} from '../../../utils';

export default (values) => {
  const errors = {};

  if (values.firstName && !validation.nameRegex.test(values.firstName)) {
    errors.firstName = 'NameRegexpError';
  }

  if (values.secondName && !validation.nameRegex.test(values.secondName)) {
    errors.secondName = 'NameRegexpError';
  }

  if (values.bio && values.bio.length < 10) {
    errors.bio = 'BioRegexpError';
  }

  if (values.phones && !validation.phoneRegex.test(values.phones)) {
    errors.phones = 'PhoneRegexpError';
  }

  return errors;
};
