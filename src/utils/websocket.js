import {codeclib} from './encrypt';
import CONFIG from '../config.js';

let _ws = null;
let _username = '';
let _password = '';

/**
 * Get base64 username@deviceId
 * @param deviceId
 * @param username - username with hostname (username@example.com)
 * @returns {*|string}
 */
function getUsernameBase64(deviceId, username) {
  const wsUsername = `${username}@${deviceId}`;

  return codeclib.base64Encode(
    codeclib.utf8Decode(wsUsername)
  );
};

/**
 * Websocket init and connect
 * @param deviceId
 * @param username - username with hostname (username@example.com)
 * @param password
 * @returns {*}
 */
const init = function (deviceId, username, password) {
  if (_ws && _username === username && _password === password) {
    return _ws;
  }

  const usernameBase64 = getUsernameBase64(deviceId, username);
  const wsUrl = `ws${CONFIG.isSecure ? 's' : ''}://${usernameBase64}:${password}@${CONFIG.wsHost}`;
  _username = username;
  _password = password;
  _ws = new WebSocket(wsUrl);
  return _ws;
};

export default {
  init,
};
