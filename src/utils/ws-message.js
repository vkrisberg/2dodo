/**
 * Websocket message data
 */
import {set, isObject, isArray, isEmpty, assignIn, omitBy, isNil, map} from 'lodash';

import {pgplib, aeslib, hashlib, datetime} from './encrypt';

const defaultChatStruct = {
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
 * Get chat message structure
 * @param action
 * @param data
 * @param members
 * @param timeDead
 * @param encryptTime
 * @param hashKey
 * @param meta
 * @returns {Promise<{message: *, hashKey: *}>}
 */
const getChatMessage = async ({action, data, members, timeDead, encryptTime, hashKey, meta}) => {
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
  const params = {
    action,
    data: {meta, payload: encryptedData},
    to: map(members, 'username'),
    encrypt_time: encryptTime,
    time_dead: timeDead,
  };

  const nextEncryptTime = datetime.getTimestamp(dateSend);
  const hashData = nextEncryptTime + encodedData + salt;
  const nextHashKey = hashlib.hexSha256(hashData);

  let message = assignIn({}, defaultChatStruct, params);
  message = omitBy(message, isNil);

  return {
    message,
    hashKey: nextHashKey,
  };
};

/**
 * Get encrypted client message structure
 * @param type
 * @param action
 * @param data
 * @param members - [{username: 'login@hostname', publicKey: 'string'}, {...}, ...]
 * @param meta
 * @returns {Promise<{}>}
 */
const getClientMessage = async ({type = 'client_message', action, data, members, meta}) => {
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
      data: {meta, payload: encryptedData},
      to: [member.username],
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
 * @returns {Promise<any>}
 */
const decryptClientMessage = async ({data, privateKey}) => {
  const message = await pgplib.decrypt(privateKey, data);

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
 * Convert dateSend to js Date
 * @param dateSend
 * @returns {*|Date}
 */
const dateSendToDate = (dateSend) => {
  const dateSend = datetime.parseDate(dateSend);

  return dateSend.toDate();
};

/**
 * Generate uuid4 string
 * @returns {*}
 */
const generateUuid = () => {
  return aeslib.salt();
};

export default {
  getChatMessage,
  getClientMessage,
  getServerMessage,
  decryptChatMessage,
  decryptClientMessage,
  hashFromMessage,
  dateSendToDate,
  generateUuid,
};
