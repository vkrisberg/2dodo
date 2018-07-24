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
      paddingBottom: 5,
      borderBottomWidth: 1,
      borderBottomColor: colors[theme].grayLight,
    },

    fullWrap: {
      flex: 1,
      width: '100%',
    }
  });
};