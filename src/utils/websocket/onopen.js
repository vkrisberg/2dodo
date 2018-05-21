import {AsyncStorage} from 'react-native';
import routeEnum from '../../enums/route-enum';
import storageEnum from '../../enums/storage-enum';
import CONFIG from '../../config';
import {types} from '../../store/account/actions';

export default function ({store, navigation}) {
  console.log('websocket connected');
  const {account: {user: {username}}} = store.getState();
  AsyncStorage.setItem(`${CONFIG.storagePrefix}:${storageEnum.authorized}`, 'true');
  AsyncStorage.setItem(`${CONFIG.storagePrefix}:${storageEnum.username}`, username);
  store.dispatch({type: types.LOGIN_SUCCESS});
  navigation.navigate(routeEnum.Main);
};
