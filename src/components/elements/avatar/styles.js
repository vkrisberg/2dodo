import {StyleSheet} from 'react-native';
import {colors, getFont, weights} from '../../../styles';

export default ({theme, color, bgColor}) => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: bgColor || colors[theme].whiteSmoke,
      width: 65,
      height: 65,
      borderRadius: 35,
      overflow: 'hidden',
    },

    text: {
      color: color || colors[theme].white,
      fontSize: 16,
      ...getFont({weight: weights.semiBold}),
    },

    avatar: {
      width: 65,
      height: 65,
    },
  });
};
