import {StyleSheet} from 'react-native';
import {colors, fonts, getFont} from '../../../styles';

export default ({theme, color, size, weight, textAlign, fontStyle}) => {
  return StyleSheet.create({
    text: {
      color: color || colors[theme].black,
      fontSize: size,
      textAlign: textAlign,
      ...getFont({weight, style: fontStyle}),
    },
  });
}
