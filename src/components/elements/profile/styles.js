import {StyleSheet} from 'react-native';
import {colors, weights, sizes, getFont} from '../../../styles';

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
      marginBottom: 10,
      ...getFont({weight: weights.semiBold}),
    },

    lastVisit: {
      color: colors[theme].grayText,
      fontSize: 15,
      marginBottom: 5,
      ...getFont({}),
    },

    actionBtn: {
      width: 'auto',
      height: 'auto',
      borderWidth: 0,
    },

    actions: {
      position: 'absolute',
      right: 0,
      bottom: 20,
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
      fontSize: 14,
      marginBottom: 10,
      ...getFont({}),
    },

    divider: {
      width: sizes.windowWidth,
      height: 15,
      backgroundColor: colors[theme].blueKrayolaDim,
      marginLeft: -20,
      marginVertical: 13,
    },

    actionsBlock: {
      alignItems: 'flex-start',
    },

    operationBtn: {
      width: '100%',
      height: 'auto',
      paddingVertical: 13,
      paddingRight: 15,
      borderWidth: 0,
      alignItems: 'flex-start',
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
      ...getFont({}),
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
