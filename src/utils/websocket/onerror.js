import routeEnum from '../../enums/route-enum';
import {AsyncStorage} from "react-native";
import storageEnum from '../../enums/storage-enum';
import CONFIG from '../../config';

export default async function ({error, store, navigation}) {
  console.log('websocket error');
  AsyncStorage.removeItem(`${CONFIG.storagePrefix}:${storageEnum.authorized}`);
  AsyncStorage.removeItem(`${CONFIG.storagePrefix}:${storageEnum.username}`);
  navigation.navigate(routeEnum.Login);
};
