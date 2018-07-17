import {validation} from '../../../utils';

export default (values) => {
  const errors = {};

  if (!values.groupName) {
    errors.groupName = 'Required';
  } else if (values.groupName && !validation.textRegex.test(values.groupName)) {
    errors.groupName = 'TextRegexpError';
  }

  return errors;
};
