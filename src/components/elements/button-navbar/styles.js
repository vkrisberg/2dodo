import {StyleSheet} from 'react-native';
import {colors, getFont, sizes} from '../../../styles';

export default ({theme, color, bgColor, position}) => {
  return StyleSheet.create({
    container: {
      backgroundColor: bgColor || 'transparent',
      alignItems: position === 'left' ? 'flex-start' : 'flex-end',
      justifyContent: 'center',
      paddingTop: 4,
      paddingHorizontal: 20,
      height: sizes.appbarHeight,
    },

    text: {
      color: color || colors[theme].orange,
      fontSize: 16,
      ...getFont({}),
    },
  });
};
