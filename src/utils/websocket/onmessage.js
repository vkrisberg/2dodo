import {contactActions} from '../../store/actions';

export default function ({event, store, navigation}) {
  console.log('websocket message', event.data);
  const data = JSON.parse(event.data);

  switch (data.action) {
    case 'get_open_key':
      store.dispatch(contactActions.updatePublicKey(data));
      break;
  }
};
