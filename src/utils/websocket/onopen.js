import routeEnum from '../../enums/route-enum';

export default function ({store, navigation}) {
  console.log('websocket connected');
  navigation.navigate(routeEnum.Main);
};
