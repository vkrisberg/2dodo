import routeEnum from '../../enums/route-enum';

export default function ({event, store, navigation}) {
  if (event.wasClean) {
    console.log('websocket closed clear');
    navigation.navigate(routeEnum.Login);
  } else {
    console.log('websocket failed');
  }
  console.log('code: ' + event.code + ' reason: ' + event.reason);
};
