import sjcl from 'sjcl';
import uuidv4 from 'uuid/v4';
import {assignIn, pick} from 'lodash';

const defaults = {
  v: 1,
  iter: 10000,
  ks: 256,
  ts: 64,
  mode: 'ccm',
  cipher: 'aes',
};

/**
 * AES encrypt
 * @param password
 * @param message
 * @param params The parameters including tag, iv and salt.
 * @returns {*}
 */
const encrypt = (password, message, params = {}) => {
  const _options = assignIn({}, defaults, params);
  let cipher = sjcl.encrypt(password, message, _options);
  cipher = sjcl.json.decode(cipher);
  cipher = pick(cipher, ['ct', 'iv']);

  return sjcl.json.encode(cipher);
};

/**
 * AES decrypt
 * @param password
 * @param cipher
 * @param params The parameters including tag, iv and salt.
 * @returns {*}
 */
const decrypt = (password, cipher, params = {}) => {
  cipher = sjcl.json.decode(cipher);
  cipher = pick(cipher, ['ct', 'iv']);
  cipher = assignIn({}, defaults, cipher);
  cipher = sjcl.json.encode(cipher);

  return sjcl.decrypt(password, cipher, params);
};

/**
 * Generate a salt from uuid4
 * @returns {*}
 */
const salt = () => {
  return uuidv4().replace(/-/g, '');
};

export default {
  encrypt,
  decrypt,
  salt,
};
