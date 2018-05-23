import {codeclib} from './encrypt';
import {onClose, onError, onMessage, onOpen} from './websocket';
import CONFIG from '../config.js';

let _ws = null;
let _deviceId = '';
let _username = '';
let _password = '';
let _url = `ws${CONFIG.isSecure ? 's' : ''}://${CONFIG.wsHost}`;
let _store = null;
let _navigation = null;

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
 * Websocket initialization
 * @param store
 * @param navigation
 * @returns {boolean}
 */
const init = function ({store, navigation}) {
  if (store) {
    _store = store;
  }

  if (navigation) {
    _navigation = navigation;
  }

  return true;
};

/**
 * Websocket connection
 * @param deviceId
 * @param username
 * @param password
 * @param url
 * @returns {*}
 */
const connect = function ({deviceId, username, password, url}) {
  if (_ws) {
    return _ws;
  }

  const wsUrl = url || _url;
  const wsHeaders = getHeaders({deviceId, username, password});

  _deviceId = deviceId;
  _username = username;
  _password = password;
  _url = wsUrl;
  _ws = new WebSocket(wsUrl, '', {headers: wsHeaders});

  _ws.onopen = () => {
    onOpen({store: _store, navigation: _navigation});
  };

  _ws.onerror = (error) => {
    onError({error, store: _store, navigation: _navigation});
  };

  _ws.onclose = (event) => {
    onClose({event, store: _store, navigation: _navigation});
    _ws = null;
  };

  _ws.onmessage = (event) => {
    onMessage({event, store: _store, navigation: _navigation});
  };

  return _ws;
};

const getInstance = () => {
  return connect({
    deviceId: _deviceId,
    username: _username,
    password: _password,
    url: _url,
  });
};

export default {
  init,
  connect,
  getInstance,
};
