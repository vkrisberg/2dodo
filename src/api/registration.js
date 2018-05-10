import http from '../utils/http';

export default {
  signUp: (data) => {
    return http.post('', data);
  }
};