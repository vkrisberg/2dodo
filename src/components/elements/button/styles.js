import {StyleSheet} from 'react-native';
import {colors, getFont} from '../../../styles';

export default ({theme, color, bgColor, borderColor, opacity}) => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: bgColor || 'transparent',
      borderColor: borderColor || colors[theme].black,
      opacity: opacity || 1,
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
