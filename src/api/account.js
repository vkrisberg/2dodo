import {services} from '../utils';

export default {
  ping: () => {
    const http = services.getHttp();
    return http.get('/ping/');
  },

  registration: ({name, password, email, open_key, hash_key, device_id, device_name, platform, settings}) => {
    const http = services.getHttp();
    const data = {name, password, email, open_key, hash_key, device_id, device_name, platform, settings};
    return http.post('/registration/', data);
  },

  updateToken: (data) => {
    const http = services.getHttp();
    return http.post('/users/', data);
  },

  acceptAction: (token) => {
    const http = services.getHttp();
    const params = {
      token,
    };
    return http.get('/tokens/', {params});
  },

  resetPassword: ({email, username}) => {
    const http = services.getHttp();
    return http.get(`/password_reset/?email=${encodeURIComponent(email)}&username=${encodeURIComponent(username)}`);
  },

  setNewPassword: ({token, password, username}) => {
    const http = services.getHttp();
    const data = {token, password, username};
    return http.post('/new_password/', data);
  },
};
