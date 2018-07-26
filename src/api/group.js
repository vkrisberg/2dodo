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

  deleteGroup: async (link) => {
    const websocket = services.getWebsocket();
    const serverMessage = await wsMessage.getServerMessage({
      action: actionEnum.deleteGroup,
      data: {
        link,
      },
    });

    websocket.send(JSON.stringify(serverMessage.message));

    return serverMessage;
  },

  getGroup: async (link) => {
    const websocket = services.getWebsocket();
    const serverMessage = await wsMessage.getServerMessage({
      action: actionEnum.getGroup,
      data: {
        link,
      },
    });

    websocket.send(JSON.stringify(serverMessage.message));

    return serverMessage;
  },

  getPublicGroupList: async () => {
    const websocket = services.getWebsocket();
    const serverMessage = await wsMessage.getServerMessage({
      action: actionEnum.getPublicGroupList,
    });

    websocket.send(JSON.stringify(serverMessage.message));

    return serverMessage;
  },

  inviteMembers: async (data) => {
    const websocket = services.getWebsocket();
    const serverMessage = await wsMessage.getServerMessage({
      action: actionEnum.inviteMembersToGroup,
      data,
    });

    websocket.send(JSON.stringify(serverMessage.message));

    return serverMessage;
  },

  subscribeToGroup: async (link) => {
    const websocket = services.getWebsocket();
    const serverMessage = await wsMessage.getServerMessage({
      action: actionEnum.subscribeToGroup,
      data: {
        link,
      },
    });

    websocket.send(JSON.stringify(serverMessage.message));

    return serverMessage;
  },

  unsubscribeFromGroup: async (link) => {
    console.log('LINK', link)
    const websocket = services.getWebsocket();
    const serverMessage = await wsMessage.getServerMessage({
      action: actionEnum.unsubscribeFromGroup,
      data: {
        link,
      },
    });

    websocket.send(JSON.stringify(serverMessage.message));

    return serverMessage;
  },

  getGroupMember: async (data) => {
    const websocket = services.getWebsocket();
    const serverMessage = await wsMessage.getServerMessage({
      action: actionEnum.getGroupMember,
      data,
    });

    websocket.send(JSON.stringify(serverMessage.message));

    return serverMessage;
  },

  updateGroupMember: async (data) => {
    const websocket = services.getWebsocket();
    const serverMessage = await wsMessage.getServerMessage({
      action: actionEnum.updateGroupMember,
      data,
    });

    websocket.send(JSON.stringify(serverMessage.message));

    return serverMessage;
  },

  sendGroupMessage: async (data) => {
    const websocket = services.getWebsocket();
    const serverMessage = await wsMessage.getServerMessage({
      action: actionEnum.sendGroupMessage,
      data,
    });

    websocket.send(JSON.stringify(serverMessage.message));

    return serverMessage;
  },
};
