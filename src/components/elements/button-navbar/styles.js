import {StyleSheet} from 'react-native';
import {colors, fonts, sizes, weights} from '../../../styles';

export default ({theme, color, bgColor, position}) => {
  return StyleSheet.create({
    container: {
      backgroundColor: bgColor || 'transparent',
      alignItems: position === 'left' ? 'flex-start' : 'flex-end',
      justifyContent: 'center',
      paddingTop: 4,
      paddingHorizontal: 10,
      height: sizes.appbarHeight,
    },

    text: {
      color: color || colors[theme].orange,
      fontFamily: fonts.main,
      fontSize: 16,
      fontWeight: weights.medium,
    },
  });
}
