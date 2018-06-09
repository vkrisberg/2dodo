import {StyleSheet} from 'react-native';
import {fonts, weights} from '../../../styles';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
  },

  link: {
    fontFamily: fonts.main,
    fontSize: 15,
    fontWeight: weights.medium,
  },
});
