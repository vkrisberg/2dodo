import {StyleSheet} from 'react-native';
import {fonts, weights} from '../../../styles';

export default ({theme, color, bgColor, borderColor}) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: bgColor,
      width: 135,
      height: 40,
      paddingHorizontal: 20,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: borderColor,
    },

    text: {
      color: color,
      fontFamily: fonts.main,
      fontSize: 15,
      fontWeight: weights.medium,
    },
  });
}
