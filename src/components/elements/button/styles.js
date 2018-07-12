import {StyleSheet} from 'react-native';
import {colors, getFont} from '../../../styles';

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
      fontSize: 16,
      ...getFont({}),
    },
  });
};
