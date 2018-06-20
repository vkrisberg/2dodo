import {StyleSheet} from 'react-native';
import {colors, fonts, weights} from '../../../styles';

export default ({theme, color, bgColor, borderColor}) => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: bgColor || 'transparent',
      borderColor: borderColor || colors[theme].black,
      borderWidth: 3,
      width: 200,
      height: 40,
      borderRadius: 20,
    },

    text: {
      color: color || colors[theme].black,
      fontFamily: fonts.main,
      fontSize: 16,
      fontWeight: weights.medium,
    },
  });
};
