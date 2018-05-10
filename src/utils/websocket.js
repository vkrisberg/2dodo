import {codeclib} from './encrypt';
import CONFIG from '../config.js';

let _ws = null;
let _username = '';
let _password = '';

/**
 * Get basic auth header
 * @param deviceId
 * @param username
 * @param password
 * @returns {{Authorization: string}}
 */
function getHeaders(deviceId, username, password) {
  const wsUsername = `${username}@${deviceId}`;
  const wsUsernameBase64 = codeclib.base64Encode(
    codeclib.utf8Decode(wsUsername)
  );
  const basicAuth = codeclib.base64Encode(
    codeclib.utf8Decode(`${wsUsernameBase64}:${password}`)
  );

  return {
    Authorization: `Basic ${basicAuth}`,
  };
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

  const wsUrl = `ws${CONFIG.isSecure ? 's' : ''}://${CONFIG.wsHost}`;
  const wsHeaders = getHeaders(deviceId, username, password);

  _ws = new WebSocket(wsUrl, '', {headers: wsHeaders});
  _username = username;
  _password = password;

  return _ws;
};

export default {
  init,
};
