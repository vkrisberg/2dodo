import http from '../utils/http';

export default {
  ping: () => {
    return http.get('/ping/');
  },

  registration: ({name, email, open_key, hash_key, device_id, device_name, platform, settings}) => {
    const data = {name, email, open_key, hash_key, device_id, device_name, platform, settings};
    return http.post('/registration/', data);
  },

  updateToken: (data) => {
    return http.post('/users/', data);
  },

  acceptAction: (token) => {
    const params = {
      token,
    };
    return http.get('/tokens/', {params});
  },
};
