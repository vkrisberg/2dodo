import routeEnum from '../../enums/route-enum';

export default async function ({error, store, navigation}) {
  console.log('websocket error');
  navigation.navigate(routeEnum.Login);
};
