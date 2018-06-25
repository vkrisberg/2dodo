import {AsyncStorage} from "react-native";
import {accountActions} from '../../store/actions';

export default async function ({error, store, navigation}) {
  console.log('websocket error');
  store.dispatch(accountActions.connectResult({connected: false, error: error}));
};
