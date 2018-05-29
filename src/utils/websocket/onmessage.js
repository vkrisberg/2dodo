import {contactActions, chatActions, chatMessageActions} from '../../store/actions';
import {actionEnum} from '../../enums';

export default function ({event, store, navigation}) {
  console.log('websocket message', event.data);
  const data = JSON.parse(event.data);

  switch (data.action) {
    case actionEnum.getOpenKey:
      store.dispatch(contactActions.updatePublicKey(data));
      break;
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
  }
};
