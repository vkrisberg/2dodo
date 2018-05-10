import http from '../utils/http';

export default {
  /**
   * Signin
   * @param login
   * @param password
   * @param remember
   * @returns {AxiosPromise<any>}
   */
  login: (login, password, remember = false) => {
    return http.post(`/api/v1/users/sign`, {login, password, remember});
  },

  /**
   * Signout
   * @returns {AxiosPromise}
   */
  logout: () => {
    return http.delete(`/api/v1/users/sign`);
  },

  /**
   * Remind
   * @returns {AxiosPromise<any>}
   */
  current: () => {
    return http.get(`/api/v1/users/self`);
  },

  /**
   * Registration
   * @returns {AxiosPromise<any>}
   */
  register: (data) => {
    return http.post('/api/registration/', data);
  }
};
