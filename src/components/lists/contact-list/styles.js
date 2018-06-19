import {colors, fonts, weights, sizes} from "../../../styles";
import {StyleSheet} from "react-native";

export default (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      marginTop: 14,
      paddingHorizontal: 10,
    },

    divider: {
      width: '100%',
      height: 2,
      backgroundColor: colors[theme].grayLight,
    },

    emptyContactsView: {
      width: sizes.windowWidth,
      position: 'absolute',
      top: '45%',
      justifyContent: 'center',
      alignItems: 'center',
    },

    text: {
      fontWeight: weights.medium,
      fontSize: 15,
      fontFamily: fonts.main,
      color: colors[theme].grayDarker,
      marginTop: 17,
    },

    caption: {
      color: colors[theme].grayInput,
      fontWeight: weights.medium,
      fontSize: 13,
      fontFamily: fonts.main,
      marginVertical: 11,
    },
  });
};
