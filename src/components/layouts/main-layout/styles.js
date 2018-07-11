import {StyleSheet} from 'react-native';
import {colors, getFont, sizes, weights} from '../../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  netinfo: {
    backgroundColor: colors.light.netInfoRedBg,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: sizes.navbarHeight,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9,
    opacity: 1,
    paddingTop: sizes.statusbarHeight,
  },

  netinfoText: {
    color: colors.light.white,
    fontSize: 16,
    ...getFont({weight: weights.semiBold}),
  },

  wsinfo: {
    backgroundColor: colors.light.netInfoBg,
    position: 'absolute',
    top: sizes.navbarHeight,
    left: 0,
    width: '100%',
    height: sizes.navbarHeight / 2,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9,
    opacity: 1,
  },

  wsinfoText: {
    color: colors.light.white,
    fontSize: 13,
    ...getFont({}),
  },
});
