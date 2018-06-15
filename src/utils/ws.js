import {codeclib} from './encrypt';
import {onClose, onError, onMessage, onOpen} from './websocket';

let _ws = null;
let _store = null;
let _navigation = null;

/**
 * Get basic auth header
 * @param deviceId
 * @param username
 * @param password
 * @param hashKey
 * @returns {{Authorization: string}}
 */
function getHeaders({deviceId, username, password, hashKey}) {
  const usernameDevice = `${username}@${deviceId}`;
  const usernameBase64 = codeclib.base64Encode(
    codeclib.utf8Decode(usernameDevice)
  );
  const passwordBase64 = codeclib.base64Encode(
    codeclib.utf8Decode(password)
  );
  const basicAuth = codeclib.base64Encode(
    codeclib.utf8Decode(`${usernameBase64}:${passwordBase64}:${hashKey}`)
  );

  return {
    Authorization: `Basic ${basicAuth}`,
  };
};

/**
 * Websocket initialization
 * @param store
 * @param navigation
 */
const init = function ({store, navigation}) {
  if (store) {
    _store = store;
  }

  if (navigation) {
    _navigation = navigation;
  }
};

/**
 * Websocket connection
 * @param deviceId
 * @param username
 * @param password
 * @param hashKey
 * @param url
 * @returns {*}
 */
const connect = function ({deviceId, username, password, hashKey, url}) {
  const wsHeaders = getHeaders({deviceId, username, password, hashKey});

  _ws = new WebSocket(url, '', {headers: wsHeaders});

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

export default {
  init,
  connect,
};
