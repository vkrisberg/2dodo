import {services, wsMessage} from '../utils';
import {actionEnum} from '../enums';
import CONFIG from '../config';

export default {
  createGroup: async (data) => {
    const websocket = services.getWebsocket();
    const serverMessage = await wsMessage.getServerMessage({
      action: actionEnum.createGroup,
      data,
    });

    websocket.send(JSON.stringify(serverMessage.message));

    return serverMessage;
  },

  updateGroup: async (data) => {
    const websocket = services.getWebsocket();
    const serverMessage = await wsMessage.getServerMessage({
      action: actionEnum.updateGroup,
      data,
    });

    websocket.send(JSON.stringify(serverMessage.message));

    return serverMessage;
  },
};
