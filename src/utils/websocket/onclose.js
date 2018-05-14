import {AsyncStorage} from 'react-native';
import routeEnum from '../../enums/route-enum';
import storageEnum from '../../enums/storage-enum';
import CONFIG from '../../config';
import {types} from '../../store/account/actions';

export default function ({event, store, navigation}) {
  AsyncStorage.removeItem(`${CONFIG.storagePrefix}:${storageEnum.authorized}`);
  store.dispatch({type: types.LOGIN_FAILURE});
  if (event.wasClean) {
    console.log('websocket closed clear');
    navigation.navigate(routeEnum.Login);
  } else {
    console.log('websocket failed');
  }
  console.log('code: ' + event.code + ' reason: ' + event.reason);
};
