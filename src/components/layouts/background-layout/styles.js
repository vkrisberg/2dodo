import {StyleSheet} from 'react-native';
import {colors} from '../../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.light.white,
  },

  image: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
