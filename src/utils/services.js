import {http, ws, realm} from './index';
import CONFIG from '../config.js';

const defaultUrl = `ws${CONFIG.isSecure ? 's' : ''}://${CONFIG.wsHost}`;

class Services {

  async init(store, config) {
    this.httpConfig = config || CONFIG;
    this.http = await http.init(this.httpConfig, store);
    this.realmConfig = config ? config.realm : CONFIG.realm;
    this.realm = await realm.init(this.realmConfig, store);
    ws.init({store});
  }

  websocketInit({store, navigation}) {
    ws.init({store, navigation});
  }

  websocketConnect({deviceId, username, password, url}) {
    this.wsConfig = {
      deviceId,
      username,
      password,
      url: url || defaultUrl
    };
    this.ws = ws.connect(this.wsConfig);
    return this.ws;
  }

  getRealm() {
    return this.realm;
  }

  getHttp() {
    return this.http;
  }

  getWebsocket() {
    if (this.ws) {
      return this.ws;
    }
    this.ws = ws.connect(this.wsConfig);
    return this.ws;
  }
}

export default new Services();
