import {StyleSheet} from 'react-native';
import {fonts, colors} from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    position: 'absolute',
    alignSelf: 'center',
    color: colors.white,
    fontFamily: fonts.main,
    fontSize: 14,
    fontWeight: '600',
    bottom: 65,
  },
});
