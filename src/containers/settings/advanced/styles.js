import {StyleSheet} from 'react-native';
import {fonts, weights, colors, sizes} from "../../../styles";

export default (theme) => {
  return StyleSheet.create({
    container: {
      width: sizes.windowWidth,
      paddingBottom: 30,
    },

    subcaption: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginTop: 20,
      marginBottom: 10,
      marginHorizontal: 20,
    },

    text: {
      fontFamily: fonts.main,
      fontSize: 15,
      fontWeight: weights.medium,
      color: colors[theme].grayInput,
    },

    textSmall: {
      fontFamily: fonts.main,
      fontSize: 13,
      fontWeight: weights.medium,
      color: colors[theme].messageTextSecond,
      paddingVertical: 15,
      paddingHorizontal: 20,
    },

    divider: {
      width: sizes.windowWidth,
      height: 15,
      backgroundColor: colors[theme].blueKrayolaDim,
    },
  });
};
