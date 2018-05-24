import {services} from '../utils';

export default {
  getOpenKey: (usernames = []) => {
    const websocket = services.getWebsocket();
    const sendData = {
      type: 'server_message',
      action: 'get_open_key',
      data: usernames,
      to: null
    };

    return websocket.send(JSON.stringify(sendData));
  },
};
