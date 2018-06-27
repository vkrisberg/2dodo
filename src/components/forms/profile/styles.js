import {StyleSheet} from 'react-native';
import {sizes, colors, weights, fonts} from '../../../styles';

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
      paddingTop: 32,
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
      borderBottomWidth: 2,
      paddingHorizontal: 0,
      marginBottom: 0,
    },

    defaultText: {
      fontFamily: fonts.main,
      fontWeight: weights.medium,
      fontSize: 15,
    },

    phones: {
      marginBottom: 23,
    },

    phoneItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    phoneText: {
      marginLeft: 10,
      marginRight: 21,
      color: colors[theme].grayInput,
      fontFamily: fonts.main,
      fontWeight: weights.medium,
      fontSize: 14,
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
      color: colors[theme].navbarDescription,
      marginRight: 13,
    },

    actionItemRight: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },

    actionBtn: {
      width: '100%',
      height: 'auto',
      borderWidth: 0,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      paddingVertical: 13,
      marginVertical: 13,
    },
  });
};
