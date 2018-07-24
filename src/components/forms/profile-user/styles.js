import {StyleSheet} from 'react-native';
import {sizes, colors, getFont, weights} from '../../../styles';

export default (theme) => {
  return StyleSheet.create({
    wrapper: {
      width: sizes.windowWidth,
      flex: 1,
    },

    container: {
      paddingHorizontal: 20,
    },

    header: {
      paddingTop: 13,
      paddingBottom: 25,
      flexDirection: 'row',
      alignItems: 'flex-start',
    },

    headerRight: {
      flex: 1,
      width: '100%',
      marginLeft: 20,
      marginTop: -10,
    },

    inputContainer: {
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },

    input: {
      color: colors[theme].grayBlue,
      borderRadius: 0,
      borderWidth: 0,
      borderBottomWidth: 1,
      paddingHorizontal: 0,
      marginBottom: 0,
    },

    defaultText: {
      fontSize: 15,
      ...getFont({}),
    },

    phones: {
      paddingBottom: 25,
    },

    phoneItem: {
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'flex-start',
    },

    phoneRight: {
      flex: 1,
      width: '100%',
      alignItems: 'flex-start',
    },

    phoneText: {
      marginLeft: 10,
      marginRight: 21,
      color: colors[theme].grayInput,
      fontSize: 14,
      lineHeight: 40,
      ...getFont({}),
    },

    phoneButton: {
      height: 40,
      justifyContent: 'center',
    },

    settingsContainer: {
      marginBottom: 23,
    },

    settingsText: {
      fontSize: 14,
      marginBottom: 7,
      ...getFont({weight: weights.medium}),
    },

    fieldContainer: {

    },

    fieldNickname: {
      paddingLeft: 11,
    },

    fieldBio: {
      paddingRight: 25,
    },

    labelNickname: {
      position: 'absolute',
      left: 0,
      lineHeight: 40,
      color: colors[theme].navbarTitle,
    },

    labelBio: {
      position: 'absolute',
      right: 0,
      lineHeight: 40,
      color: colors[theme].grayInput,
    },

    divider: {
      width: sizes.windowWidth,
      height: 15,
      backgroundColor: colors[theme].blueKrayolaDim,
      marginLeft: -20,
    },

    actionItem: {
      paddingVertical: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 2,
      borderBottomColor: colors[theme].grayLight,
    },

    actionText: {
      color: colors[theme].messageTextMain,
    },

    actionSubtext: {
      color: colors[theme].messageTextSecond,
      marginRight: 13,
    },

    actionItemRight: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },

    btnContainer: {
      paddingVertical: 15,
    },

    actionBtn: {
      width: '100%',
      height: 'auto',
      borderWidth: 0,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      paddingVertical: 13,
    },
  });
};
