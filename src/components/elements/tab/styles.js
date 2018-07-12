import {StyleSheet} from 'react-native';
import {colors, getFont} from '../../../styles';

export default (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 25,
    },

    text: {
      fontSize: 11,
      color: colors[theme].red,
      position: 'absolute',
      bottom: 10,
      ...getFont({}),
    },
  });
};