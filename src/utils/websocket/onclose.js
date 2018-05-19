import {AsyncStorage} from 'react-native';
import routeEnum from '../../enums/route-enum';
import storageEnum from '../../enums/storage-enum';
import CONFIG from '../../config';
import {types} from '../../store/account/actions';

export default function ({event, store, navigation}) {
  AsyncStorage.removeItem(`${CONFIG.storagePrefix}:${storageEnum.authorized}`);
  if (event.wasClean) {
    console.log('websocket closed clear');
    store.dispatch({type: types.LOGOUT_SUCCESS});
    navigation.navigate(routeEnum.Login);
  } else {
    store.dispatch({type: types.LOGIN_FAILURE});
    console.log('websocket failed');
  }
  console.log('code: ' + event.code + ' reason: ' + event.reason);
};
