import {services, wsMessage} from '../utils';
import {actionEnum} from '../enums';

export default {
  deliveryReport: async (encryptTime) => {
    if (!encryptTime) {
      return null;
    }

    const websocket = services.getWebsocket();
    const serverMessage = await wsMessage.getClientMessage({
      action: actionEnum.deliveryReport,
      data: {
        encrypt_time: encryptTime,
      },
      to: '',
    });

    websocket.send(JSON.stringify(serverMessage.message));

    return serverMessage;
  },
};
