import {services} from '../utils';
import {actionEnum} from '../enums';

export default {
  getOpenKey: (usernames = []) => {
    const websocket = services.getWebsocket();
    const sendData = {
      type: 'server_message',
      action: actionEnum.getOpenKey,
      data: usernames,
      to: null
    };

    return websocket.send(JSON.stringify(sendData));
  },
};
