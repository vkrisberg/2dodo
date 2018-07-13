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

const fontStyle = {
  normal: 'normal',
  italic: 'italic',
};

const androidFonts = {
  'Exo 2': 'Exo2',
};

const androidWeights = {
  '100': 'Thin',
  '200': 'ExtraLight',
  '300': 'Light',
  '400': 'Regular',
  '500': 'Medium',
  '600': 'SemiBold',
  '700': 'Bold',
  '800': 'ExtraBold',
  '900': 'Black',
};

const androidFontStyle = {
  'normal': '',
  'italic': 'Italic',
};

const colors = {
  light: {
    white: '#ffffff',
    whiteSmoke: '#f4f4f4',
    whiteOpacity: 'rgba(255,255,255,.9)',
    whiteMoreOpacity: 'rgba(255,255,255,.3)',
    black: '#000000',
    blackText: '#1f2225',
    blackNight: '#272727',
    gray: '#c1c1c1',
    grayDarker: '#808694',
    grayPlaceholder: '#bec2c9',
    grayBorder: '#4e4e4e',
    grayBlue: '#2e2e30',
    grayText: '#77777b',
    grayInput: '#898f9c',
    grayBg: '#f2f3f5',
    grayLight: '#eceff4',
    grayGainsborough: '#e4e4e4',
    grayQuartz: '#595752',
    grayLightQuartz: '#A9A69E',
    grayIcon: '#a4a7ae',
    grayCement: '#71767d',
    red: '#f4591c',
    redInputBorder: '#ffcbbb',
    redLight: '#ff6659',
    blue: '#62a3ff',
    blueDarker: '#1e72d1',
    bluePlaceholder: '#a8cbf0',
    blueInputBorder: '#7eace8',
    blueKrayola: '#afb5c1',
    blueKrayolaDim: '#f4f5f7',
    blueCornFlower: '#4b8eed',
    blueStatus: '#5395f3',
    blueOpacity: 'rgba(98, 163, 255, .1)',
    orange: '#fe8b24',
    netInfoBg: 'rgba(44,44,44,0.9)',
    netInfoRedBg: 'rgba(255,102,89,0.9)',
    disableButtonBg: '#f9f9f9',
    disableButtonText: '#b2b2b2',
    tabBarTopBorder: '#f2f5fa',
    tabBarActiveTint: '#62a3ff',
    tabBarInactiveTint: '#969aa2',
    tabBarActiveBg: '#ffffff',
    tabBarInactiveBg: '#ffffff',
    bgMain: '#ffffff',
    navbarTitle: '#26292d',
    backButton: '#6a7686',
    addButton: '#62a3ff',
    loginButtonText: '#3d76d3',
    loginBorder: '#efefef',
    // Chat message
    messageTextMain: '#1f2225',
    messageTextSecond: '#9399a5',
    messageRightBg: '#5a9cf8',
    messageLeftBg: '#ffffff',
    messageBorder: '#dbdbdb',
    messageInputBg: '#f7f7f7',
    messageAudioBtnBg: '#eaeaea',
    messageTextBtnBg: '#62a3ff',
  },
  night: {
    white: '#ffffff',
    whiteSmoke: '#f4f4f4',
    whiteOpacity: 'rgba(255,255,255,.9)',
    whiteMoreOpacity: 'rgba(255,255,255,.3)',
    black: '#000000',
    blackText: '#1f2225',
    blackNight: '#272727',
    gray: '#c1c1c1',
    grayDarker: '#808694',
    grayPlaceholder: '#bec2c9',
    grayBorder: '#4e4e4e',
    grayBlue: '#2e2e30',
    grayText: '#77777b',
    grayInput: '#898f9c',
    grayBg: '#f2f3f5',
    grayLight: '#eceff4',
    grayGainsborough: '#e4e4e4',
    grayQuartz: '#595752',
    grayLightQuartz: '#A9A69E',
    grayIcon: '#a4a7ae',
    grayCement: '#71767d',
    red: '#f4591c',
    redInputBorder: '#ffcbbb',
    redLight: '#ff6659',
    blue: '#62a3ff',
    blueDarker: '#1e72d1',
    bluePlaceholder: '#a8cbf0',
    blueInputBorder: '#7eace8',
    blueKrayola: '#afb5c1',
    blueKrayolaDim: '#f4f5f7',
    blueCornFlower: '#4b8eed',
    blueStatus: '#5395f3',
    blueOpacity: 'rgba(98, 163, 255, .1)',
    orange: '#fe8b24',
    netInfoBg: 'rgba(44,44,44,0.9)',
    netInfoRedBg: 'rgba(255,102,89,0.9)',
    disableButtonBg: '#f9f9f9',
    disableButtonText: '#b2b2b2',
    tabBarTopBorder: '#f2f5fa',
    tabBarActiveTint: '#62a3ff',
    tabBarInactiveTint: '#969aa2',
    tabBarActiveBg: '#ffffff',
    tabBarInactiveBg: '#ffffff',
    bgMain: '#242424',
    navbarTitle: '#26292d',
    backButton: '#6a7686',
    addButton: '#62a3ff',
    loginButtonText: '#3d76d3',
    loginBorder: '#efefef',
    // Chat message
    messageTextMain: '#1f2225',
    messageTextSecond: '#9399a5',
    messageRightBg: '#5a9cf8',
    messageLeftBg: '#ffffff',
    messageBorder: '#dbdbdb',
    messageInputBg: '#f7f7f7',
    messageAudioBtnBg: '#eaeaea',
    messageTextBtnBg: '#62a3ff',
  },
};

const getFont = ({weight = weights.medium, style = fontStyle.normal, family = fonts.main}) => {
  const fontFamily = OS === 'ios' ? family : androidFonts[family];

  if (OS === 'android') {
    const _weight = androidWeights[weight] || '';
    const _style = androidFontStyle[style] || '';
    const suffix = _weight || _style ? `-${_weight}${_style}` : '';

    return {
      fontFamily: fontFamily + suffix,
    };
  }

  return {
    fontFamily,
    fontWeight: weight,
    fontStyle: style,
  };
};

export {
  sizes,
  fonts,
  weights,
  fontStyle,
  colors,
  getFont,
};
