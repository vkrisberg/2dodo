import {services, wsMessage} from '../utils';
import {actionEnum} from '../enums';
import CONFIG from '../config';

export default {
  createChat: async (data, contacts) => {
    const websocket = services.getWebsocket();
    const meta = {
      ...CONFIG.message,
      chatId: data.id,
    };
    const clientMessage = await wsMessage.getClientMessage({
      action: actionEnum.createChat,
      members: contacts,
      data,
      meta,
    });

    for (let i = 0; i < clientMessage.messages.length; i++) {
      websocket.send(JSON.stringify(clientMessage.messages[i]));
    }

    return clientMessage;
  },

  sendChatMessage: async ({data, contacts, timeDead, encryptTime, hashKey}) => {
    const websocket = services.getWebsocket();
    const meta = {
      ...CONFIG.message,
      chatId: data.chatId,
    };
    const chatMessage = await wsMessage.getChatMessage({
      action: actionEnum.chatMessage,
      members: contacts,
      data,
      timeDead,
      encryptTime,
      hashKey,
      meta,
    });

    websocket.send(JSON.stringify(chatMessage.message));

    return chatMessage;
  },
};
