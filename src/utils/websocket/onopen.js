import {AsyncStorage} from 'react-native';
import routeEnum from '../../enums/route-enum';
import storageEnum from '../../enums/storage-enum';
import CONFIG from '../../config';
import {types} from '../../store/account/actions';

export default function ({store, navigation}) {
  console.log('websocket connected');
  AsyncStorage.setItem(`${CONFIG.storagePrefix}:${storageEnum.authorized}`, 'true');
  store.dispatch({type: types.LOGIN_SUCCESS});
  navigation.replace(routeEnum.Messages);
};
