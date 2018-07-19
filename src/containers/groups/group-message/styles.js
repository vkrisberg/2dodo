import {StyleSheet} from 'react-native';
import {colors, sizes} from '../../../styles';

export default (theme) => {
  return StyleSheet.create({
    container: {
      width: sizes.windowWidth,
      flex: 1,
      flexDirection: 'column',
      paddingTop: 5,
    },

    navbarContainer: {
      borderBottomWidth: 1,
      borderBottomColor: colors[theme].grayLight,
    },
  });
};