import * as openpgp from 'react-native-openpgp';
import {assignIn} from 'lodash';

const defaults = {
  userIds: [
    {name:'', email:''},
  ],
  numBits: 2048,
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
    publicKeys: openpgp.key.readArmored(publicKey).keys,
  };

  return openpgp.encrypt(options).then((ciphertext) => {
    return ciphertext;
  });
};

/**
 * Decrypt
 * @param privateKey
 * @param data
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
const decrypt = (privateKey, data) => {
  const options = {
    message: openpgp.message.readArmored(data),
    privateKeys: openpgp.key.readArmored(privateKey).keys,
  };

  return openpgp.decrypt(options).then((plaintext) => {
    return plaintext;
  });
};

export default {
  generateKey,
  encrypt,
  decrypt,
};
