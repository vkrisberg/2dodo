import {StyleSheet} from 'react-native';
import {colors, fonts, weights} from '../../../styles';

export default (theme) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },

    text: {
      color: colors[theme].grayIcon,
      fontFamily: fonts.main,
      fontSize: 13,
      fontWeight: weights.medium,
      marginTop: 7,
    },
  });
};
