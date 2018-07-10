import {StyleSheet} from 'react-native';
import {colors, fonts, weights} from '../../../styles';

export default (theme, type) => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      marginTop: type === 'main' ? -5 : 5,
      marginBottom: 10,
    },

    text: {
      color: type === 'main' ? colors[theme].red : colors[theme].redLight,
      fontFamily: fonts.main,
      fontSize: type === 'main' ? 15 : 14,
      fontWeight: weights.medium,
      marginBottom: type === 'main' ? 5 : 0,
    },
  });
};
