import {services, wsMessage} from '../utils';
import {actionEnum} from '../enums';

export default {
  getOpenKey: async (usernames = []) => {
    const websocket = services.getWebsocket();
    const serverMessage = await wsMessage.getServerMessage({
      action: actionEnum.getOpenKey,
      data: usernames,
    });

    websocket.send(JSON.stringify(serverMessage.message));

    return serverMessage;
  },

  search: async (username) => {
    const websocket = services.getWebsocket();
    const serverMessage = await wsMessage.getServerMessage({
      action: actionEnum.searchUser,
      data: username,
    });

    websocket.send(JSON.stringify(serverMessage.message));

    return serverMessage;
  },
};
