import {StyleSheet} from 'react-native';
import {colors, getFont, sizes} from '../../../styles';

export default (theme) => {
  return StyleSheet.create({
    top: {
      width: '100%',
      paddingHorizontal: 10,
      marginBottom: 20,
    },

    actionItemWrap: {
      borderBottomWidth: 2,
      borderBottomColor: colors[theme].grayLight,
    },

    actionItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 13,
    },

    text: {
      color: colors[theme].blackText,
      fontSize: 15,
      ...getFont({}),
    },

    checkbox: {
      paddingVertical: 10,
      paddingLeft: 0,
    },

    caption: {
      width: '100%',
      color: colors[theme].grayInput,
      fontSize: 14,
      paddingLeft: 10,
      textAlign: 'left',
      ...getFont({}),
    },

    btnContainer: {
      width: '100%',
      paddingVertical: 25,
      alignItems: 'center',
      backgroundColor: colors[theme].bgMain,
    },

    btn: {
      width: '74%',
    },

    btnText: {
      color: colors[theme].black,
      fontSize: 16,
      ...getFont({}),
    },

    searchBlock: {
      flex: 1,
      marginTop: 10,
    },

    styledInput: {
      height: 40,
    },

    inputViewStyles: {
      backgroundColor: 'transparent',
      borderBottomWidth: 2,
      borderBottomColor: colors[theme].grayLight,
      borderRadius: 0,
      marginHorizontal: 10,
      paddingHorizontal: 0,
      paddingRight: 10,
      justifyContent: 'flex-start',
    },

    searchPlaceholder: {
      left: 23,
    },
  });
};
