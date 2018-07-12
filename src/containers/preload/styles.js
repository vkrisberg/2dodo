import {StyleSheet} from 'react-native';
import {colors, getFont} from '../../styles';

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
    fontSize: 14,
    bottom: 65,
    ...getFont({}),
  },
});
