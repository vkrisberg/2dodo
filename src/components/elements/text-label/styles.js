import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../../styles';

export default ({theme, color, size, weight, textAlign, fontStyle}) => {
  return StyleSheet.create({
    text: {
      color: color || colors[theme].black,
      fontFamily: fonts.main,
      fontSize: size,
      fontWeight: weight,
      textAlign: textAlign,
      fontStyle: fontStyle,
    },
  });
}
