import {services, wsMessage} from '../utils';
import {actionEnum} from '../enums';

export default {
  deliveryReport: async (encryptTime) => {
    if (!encryptTime) {
      return null;
    }

    const websocket = services.getWebsocket();
    const serverMessage = await wsMessage.getServerMessage({
      action: actionEnum.deliveryReport,
      data: {
        encrypt_time: encryptTime,
      },
      to: '',
    });

    websocket.send(JSON.stringify(serverMessage.message));

    return serverMessage;
  },

  updatePushToken: async (token) => {
    const websocket = services.getWebsocket();
    const serverMessage = await wsMessage.getServerMessage({
      action: actionEnum.updatePushToken,
      data: {
        push_token: token,
      },
      to: '',
    });

    websocket.send(JSON.stringify(serverMessage.message));

    return serverMessage;
  },
};
