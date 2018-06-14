import {StyleSheet} from 'react-native';
import {fonts, weights} from '../../../styles';

export default ({theme, color, borderColor, borderWidth}) => {
  return StyleSheet.create({
    input: {
      color: color,
      fontFamily: fonts.main,
      fontSize: 15,
      fontWeight: weights.medium,
      borderWidth: borderWidth,
      borderRadius: 20,
      borderColor: borderColor,
      marginBottom: 15,
      paddingHorizontal: 20,
      height: 40,
      width: '100%',
    },
  });
}
