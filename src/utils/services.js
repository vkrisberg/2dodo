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

  navigationInit(navigation) {
    this.navigation = navigation;
    ws.init({navigation});
  }

  websocketConnect({deviceId, hostname, username, password, hashKey, url}) {
    let _url = url || defaultUrl;
    if (hostname) {
      _url = `ws${CONFIG.isSecure ? 's' : ''}://${hostname}/ws/`;
    }
    this.wsConfig = {
      deviceId,
      username,
      password,
      hashKey,
      url: _url,
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

  getNavigation() {
    return this.navigation;
  }
}

export default new Services();
