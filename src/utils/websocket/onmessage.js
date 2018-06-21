import {
  contactActions,
  chatActions, chatMessageActions,
  groupActions, groupMessageActions
} from '../../store/actions';
import {actionEnum} from '../../enums';

export default function ({event, store, navigation}) {
  console.log('websocket message', event.data);
  const data = JSON.parse(event.data);

  switch (data.action) {
    // server
    case actionEnum.getOpenKey:
      store.dispatch(contactActions.updatePublicKey(data));
      break;
    // chat
    case actionEnum.createChat:
      store.dispatch(chatActions.receiveChat(data));
      break;
    case actionEnum.chatMessage:
      store.dispatch(chatMessageActions.receiveMessage(data));
      break;
    case actionEnum.chatMessageReceived:
      store.dispatch(chatMessageActions.receiveMessageStatus(data));
      break;
    case actionEnum.chatMessageRead:
      store.dispatch(chatMessageActions.receiveMessageStatus(data));
      break;
    case actionEnum.chatMessageTyping:
      store.dispatch(chatMessageActions.receiveMessageStatus(data));
      break;
    // group
    case actionEnum.createGroup:
      store.dispatch(groupActions.createResult(data));
      break;
    case actionEnum.updateGroup:
      store.dispatch(groupActions.updateResult(data));
      break;
    case actionEnum.deleteGroup:
      store.dispatch(groupActions.deleteResult(data));
      break;
    case actionEnum.getGroup:
      store.dispatch(groupActions.getGroupResult(data));
      break;
    case actionEnum.getPublicGroupList:
      store.dispatch(groupActions.getPublicGroupListResult(data));
      break;
    case actionEnum.inviteMembersToGroup:
      if (data.encrypt_time) {
        store.dispatch(groupActions.receiveInvite(data));
      } else {
        store.dispatch(groupActions.inviteResult(data));
      }
      break;
    case actionEnum.subscribeToGroup:
      store.dispatch(groupActions.subscribeToGroupResult(data));
      break;
    case actionEnum.unsubscribeFromGroup:
      store.dispatch(groupActions.unsubscribeFromGroupResult(data));
      break;
    case actionEnum.getGroupMember:
      store.dispatch(groupActions.getGroupMemberResult(data));
      break;
    case actionEnum.updateGroupMember:
      store.dispatch(groupActions.updateGroupMemberResult(data));
      break;
  }
};
