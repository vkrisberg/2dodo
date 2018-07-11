import {StyleSheet} from 'react-native';
import {colors, sizes, getFont} from '../../../../styles';

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
      fontSize: 14,
      color: colors[theme].grayInput,
      paddingLeft: 20,
      paddingTop: 23,
      paddingBottom: 15,
      paddingRight: 60,
      ...getFont({}),
    },
  });
};
