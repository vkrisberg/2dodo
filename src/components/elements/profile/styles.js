import {StyleSheet} from 'react-native';
import {colors, fonts, weights, sizes} from '../../../styles';

export default (theme) => {
  return StyleSheet.create({
    wrapper: {
      width: '100%',
      flex: 1,
    },

    container: {
      paddingHorizontal: 20,
    },

    header: {
      paddingVertical: 20,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      borderBottomWidth: 2,
      borderBottomColor: colors[theme].grayLight,
    },

    userData: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 5,
    },

    avatar: {
      marginRight: 20,
      flexShrink: 0,
    },

    info: {
      flexShrink: 1,
    },

    name: {
      color: colors[theme].grayBlue,
      fontSize: 16,
      fontWeight: weights.semiBold,
      fontFamily: fonts.main,
      marginBottom: 10,
    },

    lastVisit: {
      color: colors[theme].grayText,
      fontSize: 15,
      fontWeight: weights.medium,
      fontFamily: fonts.main,
      marginBottom: 5,
    },

    actionBtn: {
      width: 'auto',
      height: 'auto',
      borderWidth: 0,
      fontSize: 15,
    },

    actions: {
      flexShrink: 0,
      alignSelf: 'flex-end',
      flexDirection: 'row',
    },

    writeIcon: {
      marginRight: 7,
    },

    callIcon: {
      marginLeft: 7,
    },

    body: {
      marginTop: 10,
      marginBottom: 12,
    },

    userInfoItem: {
      marginTop: 10,
    },

    userInfoText: {
      fontFamily: fonts.main,
      fontSize: 14,
      fontWeight: weights.medium,
      marginBottom: 10,
    },

    divider: {
      width: sizes.windowWidth,
      height: 15,
      backgroundColor: colors[theme].blueKrayola,
      marginLeft: -20,
      marginVertical: 13,
    },

    actionsBlock: {
      alignItems: 'flex-start',
    },

    operationBtn: {
      width: 'auto',
      height: 'auto',
      paddingVertical: 13,
      paddingRight: 15,
      borderWidth: 0,
    },

    operationLink: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    operationText: {
      color: colors[theme].blackText,
      fontSize: 15,
      fontWeight: weights.medium,
      fontFamily: fonts.main,
    },

    grayText: {
      color: colors[theme].grayText,
      marginRight: 13,
    },

    textPaddings: {
      paddingVertical: 13,
      paddingRight: 15,
    },

    center: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },

    dividerThin: {
      width: '100%',
      height: 2,
      backgroundColor: colors[theme].grayLight,
      marginVertical: 13,
    },
  });
};
