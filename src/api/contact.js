import {services, wsMessage} from '../utils';
import {actionEnum} from '../enums';

export default {
  getOpenKey: async (usernames = []) => {
    const websocket = services.getWebsocket();
    const serverMessage = await wsMessage.getServerMessage({
      action: actionEnum.getOpenKey,
      data: usernames,
    });

    return websocket.send(JSON.stringify(serverMessage.message));
  },
};
