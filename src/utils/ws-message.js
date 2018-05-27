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
 * @returns {Promise<{message: string, encryptTime: number, hash: *}>}
 */
const getChatMessage = async ({action, data, members, timeDead, encryptTime, hashKey}) => {
  if (!isObject(data)) {
    throw new Error('\'data\' is not an object');
  }

  if (!isArray(members) || isEmpty(members)) {
    throw new Error('\'to\' is not an array or empty');
  }

  const dateSend = datetime.getDateSend(data);
  const salt = aeslib.salt();
  set(data, 'dateSend', datetime.getRfcDate(dateSend));
  set(data, 'salt', salt);

  const encodedData = JSON.stringify(data);
  const encryptedData = aeslib.encrypt(hashKey, encodedData);
  const params = {
    data: encryptedData,
    action,
    to: map(members, 'username'),
    encrypt_time: encryptTime,
    time_dead: timeDead,
  };

  const encryptTime = datetime.getTimestamp(dateSend);
  const hashData = encryptTime + encodedData + salt;
  const hash = hashlib.hexSha256(hashData);

  let message = assignIn({}, defaultChatStruct, params);
  message = omitBy(message, isNil);

  return {
    message,
    hash,
    dateSend: datetime.getDate(dateSend),
  };
};

/**
 * Get client message structure
 * @param type
 * @param action
 * @param data
 * @param members - [{username: 'login@hostname', publicKey: 'string'}, {...}, ...]
 * @returns {Promise<{}>}
 */
const getClientMessage = async ({type = 'client_message', action, data, members}) => {
  if (isNil(data) || !isObject(data)) {
    throw new Error('\'data\' is not an object or empty');
  }

  if (!isArray(members) || isEmpty(members)) {
    throw new Error('\'to\' is not an array or empty');
  }

  let messages = [];

  const dateSend = datetime.getDateSend(data);
  const salt = aeslib.salt();
  set(data, 'dateSend', datetime.getRfcDate(dateSend));
  set(data, 'salt', salt);
  const encodedData = JSON.stringify(data);

  for (let i = 0; i < members.length; i++) {
    const member = members[i];
    const encryptedData = await pgplib.encrypt(member.publicKey, encodedData);
    const message = {
      type,
      action,
      data: encryptedData,
      to: [member.username],
    };
    messages.push(message);
  }

  const encryptTime = datetime.getTimestamp(dateSend);
  const hashData = encryptTime + encodedData + salt;
  const hash = hashlib.hexSha256(hashData);

  return {
    messages,
    hash,
    dateSend: datetime.getDate(dateSend),
  };
};

/**
 * Get server message structure
 * @param type
 * @param action
 * @param data
 * @param to
 * @returns {Promise<string>}
 */
const getServerMessage = async ({type = 'server_message', action, data, to}) => {
  let params = {type, action, data, to};

  let message = assignIn({}, defaultServiceStruct, params);
  message = omitBy(message, isNil);

  return JSON.stringify(message);
};

/**
 * Decrypt chat message
 * @param data
 * @param hashKey
 * @returns {any}
 */
const decryptChatMessage = ({data, hashKey}) => {
  const message = aeslib.decrypt(hashKey, data);

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

export default {
  getChatMessage,
  getClientMessage,
  getServerMessage,
  decryptChatMessage,
  hashFromMessage,
};
