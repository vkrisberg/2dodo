import axios from 'axios';

const init = async function (config, store) {
  const url = `http${config.isSecure ? 's' : ''}://${config.httpHost}${config.baseUrl}`;
  return axios.create({
    baseURL: url,
    headers: {},
  });
};

export default {
  init
};
