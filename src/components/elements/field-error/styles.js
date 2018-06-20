import {StyleSheet} from 'react-native';
import {colors, fonts, weights} from '../../../styles';

export default ({theme}) => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      marginTop: -5,
      marginBottom: 10,
    },

    text: {
      color: colors[theme].red,
      fontFamily: fonts.main,
      fontSize: 15,
      fontWeight: weights.medium,
      marginBottom: 5,
    },
  });
}
