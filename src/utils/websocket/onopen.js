import {AsyncStorage} from 'react-native';
import {accountActions} from '../../store/actions';

export default function ({store, navigation}) {
  console.log('websocket connected');
  store.dispatch(accountActions.connectResult({connected: true, error: null}));
};
