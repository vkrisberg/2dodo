import {StyleSheet} from 'react-native';
import {colors, sizes, getFont} from '../../../../styles';

export default (theme) => {
  return StyleSheet.create({
    container: {
      width: sizes.windowWidth,
      paddingBottom: 30,
    },

    text: {
      fontSize: 14,
      color: colors[theme].grayInput,
      paddingHorizontal: 20,
      paddingVertical: 18,
      ...getFont({}),
    },
  });
};
