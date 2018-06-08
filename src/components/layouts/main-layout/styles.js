import {StyleSheet} from 'react-native';
import {colors, fonts, sizes} from '../../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  netinfo: {
    backgroundColor: colors.red,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: sizes.navbarHeight,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9,
    opacity: .85,
    paddingTop: sizes.statusbarHeight,
  },

  netinfoText: {
    color: colors.white,
    fontFamily: fonts.main,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
