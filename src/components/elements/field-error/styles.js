import {StyleSheet} from 'react-native';
import {colors, getFont} from '../../../styles';

export default (theme, type) => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      marginTop: type === 'main' ? -5 : 5,
      marginBottom: 10,
    },

    text: {
      color: type === 'main' ? colors[theme].red : colors[theme].redLight,
      fontSize: type === 'main' ? 15 : 14,
      marginBottom: type === 'main' ? 5 : 0,
      ...getFont({}),
    },
  });
};
