import {StyleSheet} from 'react-native';
import {weights, colors, sizes, getFont} from '../../../../styles';

export default (theme) => {
  return StyleSheet.create({
    container: {
      width: sizes.windowWidth,
      paddingHorizontal: 20,
    },

    defaultText: {
      fontSize: 15,
      color: colors[theme].messageTextMain,
      marginBottom: 7,
      ...getFont({}),
    },

    grayText: {
      fontSize: 14,
      color: colors[theme].grayInput,
      ...getFont({}),
    },

    semiBoldText: {
      ...getFont({weight: weights.semiBold}),
    },

    topBorder: {
      marginTop: 5,
      paddingTop: 20,
      borderTopWidth: 1,
      borderTopColor: colors[theme].grayLight,
    },

    connectionBlock: {
      width: '100%',
      paddingTop: 15,
      flexDirection: 'row',
    },

    connectionIcon: {
      flexShrink: 0,
    },

    connectionInfo: {
      paddingBottom: 15,
      marginLeft: 18,
      borderBottomWidth: 1,
      borderBottomColor: colors[theme].grayLight,
      flex: 1,
    },

    bottomBlock: {
      width: sizes.windowWidth,
      paddingVertical: 10,
      backgroundColor: colors[theme].bgMain,
      position: 'absolute',
      bottom: 0,
      left: 0,
    },

    button: {
      borderWidth: 0,
      width: '100%',
    },

    buttonText: {
      fontSize: 15,
      color: colors[theme].blueCornFlower,
    },
  });
};
