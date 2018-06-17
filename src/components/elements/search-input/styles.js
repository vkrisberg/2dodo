import {colors} from "../../../styles";
import {StyleSheet} from "react-native";

export default (theme) => {
  return StyleSheet.create({
    searchInputView: {
      width: '100%',
      height: 30,
      backgroundColor: colors[theme].grayBg,
      paddingVertical: 0,
      paddingHorizontal: 10,
      marginTop: 8,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },

    iconContainer: {
      alignSelf: 'flex-start',
    },

    styledText: {
      position: 'absolute',
      fontSize: 13,
      color: colors[theme].grayInput,
    },

    inputView: {
      position: 'absolute',
      top: 0,
      width: '100%',
      paddingLeft: 33,
      paddingRight: 35,
      alignItems: 'center',
    },

    styledInput: {
      height: 30,
      width: '100%',
      padding: 0,
      fontSize: 13,
      color: colors[theme].grayBlue,
    },
  });
};
