import {StyleSheet} from 'react-native';
import {fonts, colors, weights} from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    position: 'absolute',
    alignSelf: 'center',
    color: colors.light.white,
    fontFamily: fonts.main,
    fontSize: 14,
    fontWeight: weights.medium,
    bottom: 65,
  },
});
