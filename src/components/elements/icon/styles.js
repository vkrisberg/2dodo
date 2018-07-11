import {StyleSheet} from 'react-native';
import {colors, getFont} from '../../../styles';

export default (theme) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },

    text: {
      color: colors[theme].grayIcon,
      fontSize: 13,
      marginTop: 7,
      ...getFont({}),
    },
  });
};
