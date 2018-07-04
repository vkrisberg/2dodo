import {StyleSheet} from 'react-native';
import {fonts, weights, colors, sizes} from '../../../styles';

export default (theme) => {
  return StyleSheet.create({
    container: {
      width: sizes.windowWidth,
      paddingBottom: 30,
    },

    text: {
      fontFamily: fonts.main,
      fontSize: 14,
      fontWeight: weights.medium,
      color: colors[theme].grayInput,
      margin: 20,
      marginRight: 40,
    },
  });
};
