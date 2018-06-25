import {services, wsMessage} from '../utils';
import {actionEnum} from '../enums';
import CONFIG from '../config';

export default {
  createChat: async (data, contacts) => {
    const websocket = services.getWebsocket();
    const meta = {
      ...CONFIG.message,
      id: data.id,
    };
    const clientMessage = await wsMessage.getClientPgpMessage({
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

  sendChatMessage: async ({data, members, timeDead, encryptTime, hashKey}) => {
    const websocket = services.getWebsocket();
    const meta = {
      ...CONFIG.message,
      id: data.id,
      chatId: data.chatId,
    };
    const chatMessage = await wsMessage.getClientAesMessage({
      action: actionEnum.chatMessage,
      members,
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
