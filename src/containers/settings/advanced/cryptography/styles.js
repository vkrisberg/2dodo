import {StyleSheet} from 'react-native';
import {colors, sizes, getFont} from '../../../../styles';

export default (theme) => {
  return StyleSheet.create({
    container: {
      width: sizes.windowWidth,
    },

    topBlock: {
      paddingHorizontal: 20,
    },

    defaultText: {
      fontSize: 15,
      color: colors[theme].grayBlue,
      ...getFont({}),
    },

    grayText: {
      fontSize: 14,
      color: colors[theme].grayInput,
      ...getFont({}),
    },

    blueText: {
      color: colors[theme].blueCornFlower,
    },

    defaultMarginBottom: {
      marginBottom: 8,
    },

    infoContainer: {
      marginBottom: 22,
    },

    keyBlock: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },

    limitWidth: {
      width: '51%',
    },

    keyIcon: {
      marginLeft: 10,
      marginBottom: 3,
    },

    divider: {
      width: sizes.windowWidth,
      height: 15,
      backgroundColor: colors[theme].blueKrayolaDim,
    },

    description: {
      paddingTop: 20,
      paddingBottom: 5,
      marginHorizontal: 20,
      borderTopWidth: 1,
      borderTopColor: colors[theme].grayLight,
    },
  });
};
