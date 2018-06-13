import {Dimensions, Platform} from 'react-native';

const OS = Platform.OS;
Dimensions.APPBAR_HEIGHT = OS === 'ios' ? 44 : 56;
Dimensions.NAVBAR_HEIGHT = OS === 'ios' ? 64 : 56;
Dimensions.STATUSBAR_HEIGHT = OS === 'ios' ? 20 : 0;
Dimensions.IS_IPHONE_5 = Dimensions.get('window').width < 375;
Dimensions.IS_IPHONE_6 = Dimensions.get('window').width === 375;
Dimensions.IS_IPHONE_PLUS = Dimensions.get('window').width > 375;

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

const fonts = {
  main: 'Exo 2',
};

const weights = {
  thin: '100',
  ultraLight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  heavy: '800',
  black: '900',
};

const colors = {
  light: {
    white: '#ffffff',
    black: '#000000',
    blackText: '#1f2225',
    blackNight: '#272727',
    whiteSmoke: '#f4f4f4',
    gray: '#c1c1c1',
    grayDarker: '#808694',
    grayPlaceholder: '#bec2c9',
    grayBorder: '#4e4e4e',
    red: '#ff0000',
    blue: '#62a3ff',
    blueDarker: '#1e72d1',
    bluePlaceholder: '#a8cbf0',
    blueInputBorder: '#7eace8',
  },
  night: {
    white: '#ffffff',
    black: '#000000',
    blackText: '#1f2225',
    blackNight: '#272727',
    whiteSmoke: '#f4f4f4',
    gray: '#c1c1c1',
    grayDarker: '#808694',
    grayPlaceholder: '#bec2c9',
    grayBorder: '#4e4e4e',
    red: '#ff0000',
    blue: '#62a3ff',
    blueDarker: '#1e72d1',
    bluePlaceholder: '#a8cbf0',
    blueInputBorder: '#7eace8',
  },
};

export {
  sizes,
  fonts,
  weights,
  colors,
}
