import {services, wsMessage} from '../utils';
import {actionEnum, messageEnum} from '../enums';
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

  sendChatMessageStatus: async ({data, members, status}) => {
    const websocket = services.getWebsocket();
    const meta = {
      ...CONFIG.message,
      ids: data.ids || [],
      chatId: data.chatId,
    };

    let action;
    switch (status) {
      case messageEnum.received:
        action = actionEnum.chatMessageReceived;
        break;
      case messageEnum.read:
        action = actionEnum.chatMessageRead;
        break;
      default:
        action = actionEnum.chatMessageTyping;
    }

    const clientMessage = await wsMessage.getClientMessage({
      action,
      data: {meta, payload: null},
      to: members,
    });
    websocket.send(JSON.stringify(clientMessage.message));

    return clientMessage;
  },
};
