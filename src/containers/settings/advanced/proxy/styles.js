import {StyleSheet} from 'react-native';
import {fonts, weights, colors, sizes} from '../../../../styles';

export default (theme) => {
  return StyleSheet.create({
    container: {
      width: sizes.windowWidth,
      paddingBottom: 30,
    },

    formContainer: {
      paddingHorizontal: 20,
    },

    text: {
      fontFamily: fonts.main,
      fontSize: 14,
      fontWeight: weights.medium,
      color: colors[theme].grayInput,
      paddingLeft: 20,
      paddingTop: 23,
      paddingBottom: 15,
      paddingRight: 60,
    },
  });
};
