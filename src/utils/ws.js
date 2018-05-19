import {codeclib} from './encrypt';
import {onClose, onError, onMessage, onOpen} from './websocket';
import store from '../store/store';
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
function getHeaders({deviceId, username, password}) {
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
 * @param username
 * @param password
 * @param navigation
 * @returns {*}
 */
const init = function ({deviceId, username, password, navigation}) {
  if (_ws) {
    return _ws;
  }

  const wsUrl = `ws${CONFIG.isSecure ? 's' : ''}://${CONFIG.wsHost}`;
  const wsHeaders = getHeaders({deviceId, username, password});

  _username = username;
  _password = password;
  _ws = new WebSocket(wsUrl, '', {headers: wsHeaders});

  _ws.onopen = () => {
    onOpen({store, navigation});
  };

  _ws.onerror = (error) => {
    onError({error, store, navigation});
    _ws = null;
  };

  _ws.onclose = (event) => {
    onClose({event, store, navigation});
    _ws = null;
  };

  _ws.onmessage = (event) => {
    onMessage({event, store, navigation});
  };

  return _ws;
};

export default {
  init,
};
