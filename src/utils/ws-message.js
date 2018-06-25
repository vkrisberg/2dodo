/**
 * Websocket message data
 */
import {set, isObject, isArray, isEmpty, assignIn, omitBy, isNil, map} from 'lodash';

import {pgplib, aeslib, hashlib, datetime, codeclib} from './encrypt';

const defaultClientStruct = {
  type: 'client_message',
  action: null,
  data: null,
  to: [], // array
  encrypt_time: null, // 2018-04-26T21:21:17.547+07:00
  time_dead: null, // 2018-04-26T21:21:17.547+07:00
};

const defaultServiceStruct = {
  type: 'server_message', // or 'client_message'
  action: null,
  data: null,
  to: null, // array
};

/**
 * Get AES encrypted client message structure
 * @param action
 * @param data
 * @param members
 * @param timeDead
 * @param encryptTime
 * @param hashKey
 * @param meta
 * @returns {Promise<{message: *, hashKey: *}>}
 */
const getClientAesMessage = async ({action, data, members, timeDead, encryptTime, hashKey, meta}) => {
  if (isNil(data) || !isObject(data)) {
    throw new Error('\'data\' is not an object or empty');
  }

  if (!isArray(members) || isEmpty(members)) {
    throw new Error('\'to\' is not an array or empty');
  }

  const dateSend = datetime.getDateSend(data);
  const salt = data.salt || aeslib.salt();
  set(data, 'dateSend', datetime.getRfcDate(dateSend));
  set(data, 'salt', salt);

  const encodedData = JSON.stringify(data);
  const encryptedData = aeslib.encrypt(hashKey, encodedData);
  const to = members[0].username ? map(members, 'username') : members;
  const params = {
    action,
    to,
    data: {meta, payload: encryptedData},
    encrypt_time: datetime.getRfcDate(encryptTime),
    time_dead: timeDead,
  };

  const nextEncryptTime = datetime.getTimestamp(dateSend);
  const hashData = nextEncryptTime + encodedData + salt;
  const nextHashKey = hashlib.hexSha256(hashData);

  let message = assignIn({}, defaultClientStruct, params);
  message = omitBy(message, isNil);

  return {
    message,
    hashKey: nextHashKey,
  };
};

/**
 * Get RSA encrypted client message structure
 * @param type
 * @param action
 * @param data
 * @param members - [{username: 'login@hostname', publicKey: 'string'}, {...}, ...]
 * @param meta
 * @returns {Promise<{}>}
 */
const getClientPgpMessage = async ({type = 'client_message', action, data, members, meta}) => {
  if (isNil(data) || !isObject(data)) {
    throw new Error('\'data\' is not an object or empty');
  }

  if (!isArray(members) || isEmpty(members)) {
    throw new Error('\'to\' is not an array or empty');
  }

  let messages = [];

  const dateSend = datetime.getDateSend(data);
  const salt = data.salt || aeslib.salt();
  set(data, 'dateSend', datetime.getRfcDate(dateSend));
  set(data, 'salt', salt);
  const encodedData = JSON.stringify(data);

  for (let i = 0; i < members.length; i++) {
    const member = members[i];
    const encryptedData = await pgplib.encrypt(member.publicKey, encodedData);
    const message = {
      type,
      action,
      to: [member.username],
      data: {meta, payload: encryptedData},
      encrypt_time: data.dateSend,
    };
    messages.push(message);
  }

  const encryptTime = datetime.getTimestamp(dateSend);
  const hashData = encryptTime + encodedData + salt;
  const nextHashKey = hashlib.hexSha256(hashData);

  return {
    messages,
    hashKey: nextHashKey,
  };
};

/**
 * Get non-encrypted client message structure
 * @param type
 * @param action
 * @param data
 * @param to
 * @returns {Promise<{message: *}>}
 */
const getClientMessage = async ({type = 'client_message', action, data, to}) => {
  let params = {type, action, data, to, encrypt_time: datetime.getRfcDate()};

  let message = assignIn({}, defaultClientStruct, params);
  message = omitBy(message, isNil);

  return {
    message,
  };
};

/**
 * Get non-encrypted server message structure
 * @param type
 * @param action
 * @param data
 * @param to
 * @returns {Promise<{}>}
 */
const getServerMessage = async ({type = 'server_message', action, data, to}) => {
  let params = {type, action, data, to};

  let message = assignIn({}, defaultServiceStruct, params);
  message = omitBy(message, isNil);

  return {
    message,
  };
};

/**
 * Decrypt chat message
 * @param data
 * @param hashKey
 * @returns {Promise<any>}
 */
const decryptChatMessage = async ({data, hashKey}) => {
  const message = aeslib.decrypt(hashKey, data);

  return JSON.parse(message);
};

/**
 * Decrypt client message
 * @param data
 * @param privateKey
 * @param password
 * @returns {Promise<any>}
 */
const decryptClientMessage = async ({data, privateKey, password}) => {
  const message = await pgplib.decrypt(privateKey, data, password);

  return JSON.parse(message);
};

/**
 * Get sha256 hash from message
 * @param message
 * @returns {*}
 */
const hashFromMessage = (message) => {
  const encodedData = JSON.stringify(message);
  const encryptTime = datetime.getTimestamp(message.dateSend);
  const hashData = encryptTime + encodedData + message.salt;

  return hashlib.hexSha256(hashData);
};

/**
 * Convert RFC date to js Date
 * @param date
 * @returns {*|Date}
 */
const rfcToDate = (date) => {
  const _date = datetime.parseDate(date);

  return _date.toDate();
};

/**
 * Convert RFC date to Realm DB timestamp
 * @param date
 * @returns {string}
 */
const rfcToRealm = (date) => {
  const _date = datetime.parseDate(date);

  return datetime.getRealmDate(_date);
};

/**
 * Convert date to RFC3339MilliSec
 * @param date
 * @returns {string}
 */
const dateToRfc = (date) => {
  return datetime.getRfcDate(date);
};

/**
 * Convert date to Realm DB timestamp
 * @param date
 * @returns {string}
 */
const dateToRealm = (date) => {
  return datetime.getRealmDate(date);
};

/**
 * Generate uuid4 string
 * @returns {*}
 */
const generateUuid = () => {
  return aeslib.salt();
};

/**
 * Get short name from contacts
 * @param contacts
 * @returns {string}
 */
const getShortName = (contacts = []) => {
  let shortName = '';
  const count = contacts && contacts.length;

  if (!count) {
    return shortName;
  }

  if (count === 1) {
    shortName = contacts[0].firstName && contacts[0].secondName
      ? contacts[0].firstName.substr(0, 1) + contacts[0].secondName.substr(0, 1)
      : contacts[0].nickname.substr(0, 2);
  } else {
    shortName = 'G' + contacts[count - 1].nickname.substr(0, 1);
  }

  return shortName.toUpperCase();
};

const getUsername = (from) => {
  if (!from) {
    return '';
  }
  const fromArr = from.split('@');
  return `${fromArr[0]}@${fromArr[1]}`;
};

const getNickname = (username) => {
  if (!username) {
    return '';
  }
  const usernameArr = username.split('@');
  return usernameArr[0];
};

const getDeviceId = (from) => {
  const fromArr = from.split('@');
  return fromArr[2];
};

const avatarToBase64 = (avatar) => {
  return codeclib.base64Encode(avatar);
};

export default {
  getClientAesMessage,
  getClientPgpMessage,
  getClientMessage,
  getServerMessage,
  decryptChatMessage,
  decryptClientMessage,
  hashFromMessage,
  rfcToDate,
  rfcToRealm,
  dateToRfc,
  dateToRealm,
  generateUuid,
  getShortName,
  getUsername,
  getNickname,
  getDeviceId,
  avatarToBase64,
};
