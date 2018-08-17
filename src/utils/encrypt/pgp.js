import * as openpgp from 'react-native-openpgp';
import {assignIn} from 'lodash';

const defaults = {
  userIds: [
    {name:'', email:''},
  ],
  numBits: 1024,
  passphrase: '',
};

/**
 * Generate RSA-2048 keys
 * @param name
 * @param email
 * @param passphrase
 * @returns {Promise<*>|Promise<Object>}
 */
const generateKey = ({name = 'Example', email = 'example@example.com', passphrase = ''}) => {
  const params = {
    userIds: [
      {name, email},
    ],
    passphrase,
  };
  const _options = assignIn({}, defaults, params);

  return openpgp.generateKey(_options).then((key) => {
    return {
      publicKey: key.publicKeyArmored,
      privateKey: key.privateKeyArmored,
    };
  });
};

/**
 * Encrypt
 * @param publicKey
 * @param data
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
const encrypt = (publicKey, data) => {
  const options = {
    data,
    publicKeys: openpgp.readArmoredKey(publicKey).keys,
  };

  return openpgp.encrypt(options).then((ciphertext) => {
    return ciphertext.data;
  });
};

/**
 * Decrypt
 * @param privateKey
 * @param data
 * @param passphrase
 * @returns {Promise<Promise<*>|Promise<Object>>}
 */
const decrypt = async (privateKey, data, passphrase = '') => {
  const _privateKey = openpgp.readArmoredKey(privateKey).keys[0];

  if (!_privateKey.primaryKey.isDecrypted && passphrase) {
    await _privateKey.decrypt(passphrase);
  }

  const options = {
    message: openpgp.readMessage(data),
    privateKey: _privateKey,
  };

  return openpgp.decrypt(options).then((plaintext) => {
    return plaintext.data;
  });
};

export default {
  generateKey,
  encrypt,
  decrypt,
};
