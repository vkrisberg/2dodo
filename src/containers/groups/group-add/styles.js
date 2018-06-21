import {StyleSheet} from 'react-native';
import {colors, fonts, sizes, weights} from '../../../styles';

export default (theme) => {
  return StyleSheet.create({
    header: {
      width: sizes.windowWidth,
      flexDirection: 'row',
    },

    styledTitle: {
      fontWeight: weights.bold,
      fontSize: 28,
      marginLeft: 20,
      color: colors[theme].navbarTitle,
    },

    titleContainer: {
      width: '100%',
      paddingLeft: 20,
      paddingRight: 10,
      marginTop: 35,
      marginBottom: 13,
      flexDirection: 'row',
      alignItems: 'center',
    },

    editBtn: {
      width: 'auto',
      height: 'auto',
      paddingHorizontal: 10,
      borderWidth: 0,
      justifyContent: 'flex-end',
      position: 'absolute',
      right: 10,
    },

    top: {
      width: '100%',
      paddingHorizontal: 10,
      marginBottom: 20,
    },

    actionItem: {
      // width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 13,
      borderBottomWidth: 2,
      borderBottomColor: colors[theme].grayLight,
    },

    text: {
      color: colors[theme].blackText,
      fontSize: 15,
      fontWeight: weights.medium,
      fontFamily: fonts.main,
    },

    checkbox: {
      paddingVertical: 10,
      paddingLeft: 0,
    },

    bottom: {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },

    bottomWrap: {
      width: '100%',
    },

    caption: {
      color: colors[theme].grayInput,
      fontSize: 14,
      fontWeight: weights.medium,
      fontFamily: fonts.main,
      paddingLeft: 10,
    },

    btnContainer: {
      width: '100%',
      paddingBottom: 25,
      paddingTop: 42,
      justifyContent: 'center',
      alignItems: 'center',
    },

    btn: {
      width: '74%',
    },

    btnText: {
      color: colors[theme].black,
      fontSize: 16,
      fontWeight: weights.medium,
      fontFamily: fonts.main,
    },
  });
};
