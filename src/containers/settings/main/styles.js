import {StyleSheet} from 'react-native';
import {colors, getFont, sizes, weights} from '../../../styles';

export default (theme) => {
  return StyleSheet.create({
    container: {
      width: sizes.windowWidth,
    },

    header: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingTop: 15,
      paddingBottom: 20,
    },

    defaultText: {
      fontSize: 15,
      ...getFont({}),
    },

    blackText: {
      color: colors[theme].blackText,
    },

    userData: {
      flexDirection: 'column',
      marginLeft: 20,
      flex: 1,
    },

    name: {
      fontSize: 16,
      color: colors[theme].grayBlue,
      marginBottom: 5,
      ...getFont({weight: weights.semiBold}),
    },

    usernameBlock: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    username: {
      color: colors[theme].grayText,
      marginBottom: 5,
    },

    buttonsBlock: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    actionBtn: {
      width: 'auto',
      height: 'auto',
      paddingVertical: 0,
      borderWidth: 0,
    },

    btnText: {
      color: colors[theme].blueCornFlower,
    },

    shareBtn: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    shareIcon: {
      marginRight: 7,
    },

    divider: {
      width: sizes.windowWidth,
      height: 15,
      backgroundColor: colors[theme].blueKrayolaDim,
    },

    content: {
      width: sizes.windowWidth,
    },

    settingsRowContainer: {
      paddingHorizontal: 20,
    },

    settingsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 20,
      borderBottomWidth: 2,
      borderBottomColor: colors[theme].grayLight,
    },

    settingsText: {
      color: colors[theme].messageTextSecond,
      marginRight: 13,
    },

    settingsRowRight: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  });
};
