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
    },

    btnContainer: {
      height: 45,
      flexDirection: 'row',
      borderTopColor: colors[theme].grayLight,
      borderTopWidth: 1,
    },

    btn: {
      width: '50%',
      height: '100%',
      borderWidth: 0,
      borderRadius: 0,
    },

    btnBorder: {
      borderLeftWidth: 1,
      borderColor: colors[theme].grayLight,
    },
  });
};