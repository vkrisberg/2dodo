import {services, wsMessage} from '../utils';
import {aeslib} from '../utils/encrypt';
import {actionEnum} from '../enums';

export default {
  createChat: async (data, contacts) => {
    const websocket = services.getWebsocket();
    const clientMessage = await wsMessage.getClientMessage({
      action: actionEnum.createChat,
      members: contacts,
      data,
    });

    for (let i = 0; i < clientMessage.messages.length; i++) {
      websocket.send(JSON.stringify(clientMessage.messages[i]));
    }

    return clientMessage;
  },

  sendChatMessage: async ({data, contacts, timeDead, encryptTime, hashKey}) => {
    const websocket = services.getWebsocket();
    const chatMessage = await wsMessage.getChatMessage({
      action: actionEnum.chatMessage,
      members: contacts,
      data,
      timeDead,
      encryptTime,
      hashKey,
    });

    websocket.send(JSON.stringify(chatMessage.message));

    return chatMessage;
  },
};
