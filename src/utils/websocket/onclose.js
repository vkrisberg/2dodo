import {AsyncStorage} from 'react-native';
import {accountActions} from '../../store/actions';

export default function ({event, store, navigation}) {
  if (event.wasClean) {
    console.log('websocket closed clean');
    store.dispatch(accountActions.logoutResult({clean: true, error: null}));
  } else {
    const {code, reason} = event;
    console.log('websocket closed failed');
    console.log('code: ' + code + ' reason: ' + reason);
    if (code === 1001) {
      store.dispatch(accountActions.logoutResult({clean: true, error: null}));
    } else if (code && reason) {
      store.dispatch(accountActions.connectResult({connected: false, error: {code, reason}}));
    }
  }
};
