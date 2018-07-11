import {StyleSheet} from 'react-native';
import {getFont} from '../../../styles';

export default ({theme, color, borderColor, borderWidth}) => {
  return StyleSheet.create({
    input: {
      color: color,
      fontSize: 15,
      borderWidth: borderWidth,
      borderRadius: 20,
      borderColor: borderColor,
      marginBottom: 15,
      paddingHorizontal: 20,
      height: 40,
      width: '100%',
      ...getFont({}),
    },
  });
};
