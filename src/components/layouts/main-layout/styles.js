import {StyleSheet} from 'react-native';
import {colors, fonts, sizes, weights} from '../../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  netinfo: {
    backgroundColor: colors.light.red,
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
    color: colors.light.white,
    fontFamily: fonts.main,
    fontSize: 18,
    fontWeight: weights.bold,
  },
});
