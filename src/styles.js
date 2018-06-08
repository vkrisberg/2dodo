import {Dimensions, Platform} from 'react-native';

const OS = Platform.OS;
Dimensions.APPBAR_HEIGHT = OS === 'ios' ? 44 : 56;
Dimensions.NAVBAR_HEIGHT = OS === 'ios' ? 64 : 56;
Dimensions.STATUSBAR_HEIGHT = OS === 'ios' ? 20 : 0;
Dimensions.IS_IPHONE_5 = Dimensions.get('window').width < 375;
Dimensions.IS_IPHONE_6 = Dimensions.get('window').width === 375;
Dimensions.IS_IPHONE_PLUS = Dimensions.get('window').width > 375;

const colors = {
  white: '#ffffff',
  black: '#000000',
  whiteSmoke: '#f4f4f4',
  gray: '#808694',
  red: '#ff0000',
  blue: '#1e72d1',
};

const fonts = {
  main: 'Exo 2',
};

const sizes = {
  appbarHeight: Dimensions.APPBAR_HEIGHT,
  navbarHeight: Dimensions.NAVBAR_HEIGHT,
  statusbarHeight: Dimensions.STATUSBAR_HEIGHT,
  isIphone5: Dimensions.IS_IPHONE_5,
  isIphone6: Dimensions.IS_IPHONE_6,
  isIphonePlus: Dimensions.IS_IPHONE_PLUS,
  windowWidth: Dimensions.get('window').width,
  windowHeight: Dimensions.get('window').height,
};

export {
  colors,
  fonts,
  sizes,
}
