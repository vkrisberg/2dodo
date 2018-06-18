import {colors, fonts, weights} from "../../../styles";
import {StyleSheet} from "react-native";

export default (theme) => {
  return StyleSheet.create({
    wrapper: {
      marginTop: 14,
      marginHorizontal: 10,
      borderTopWidth: 2,
      borderTopColor: colors[theme].grayLight,
    },

    emptyContactsView: {
      width: '100%',
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
