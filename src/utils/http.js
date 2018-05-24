import axios from 'axios';
import CONFIG from '../config.js';

const httpUrl = `http${CONFIG.isSecure ? 's' : ''}://${CONFIG.httpHost}${CONFIG.baseUrl}`;
const http = axios.create({
  baseURL: httpUrl,
  headers: {},
});

http.init = async function (store) {
  let prevToken = store.getState().account.token;
  store.subscribe(() => {
    let newToken = store.getState().account.token;
    if (newToken !== prevToken) {
      if (newToken === null) {
        delete this.defaults.headers['Authorization'];
      } else {
        this.defaults.headers['Authorization'] = newToken;
      }
      prevToken = newToken;
    }
  });
};

export default http;
