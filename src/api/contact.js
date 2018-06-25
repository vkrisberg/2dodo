import {services, wsMessage} from '../utils';
import {actionEnum} from '../enums';
import CONFIG from '../config';

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

  requestProfile: async (usernames) => {
    const websocket = services.getWebsocket();
    const meta = {
      ...CONFIG.message,
    };
    const clientMessage = await wsMessage.getClientMessage({
      action: actionEnum.requestProfile,
      data: {meta, data: null},
      to: usernames,
    });

    websocket.send(JSON.stringify(clientMessage.message));

    return clientMessage;
  },

  sendProfile: async ({data, contacts}) => {
    const websocket = services.getWebsocket();
    const meta = {
      ...CONFIG.message,
    };
    const clientMessage = await wsMessage.getClientPgpMessage({
      action: actionEnum.sendProfile,
      members: contacts,
      data,
      meta,
    });

    for (let i = 0; i < clientMessage.messages.length; i++) {
      websocket.send(JSON.stringify(clientMessage.messages[i]));
    }

    return clientMessage;
  },
};
