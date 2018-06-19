import {StyleSheet} from "react-native";
import {colors, fonts, weights, sizes} from "../../../styles";

export default ({theme}) => {
  return StyleSheet.create({
    container: {
    },

    containerRight: {
      backgroundColor: colors[theme].messageRightBg,
      borderRadius: 10,
      marginVertical: 5,
      marginLeft: 40,
      padding: 10,
    },

    containerLeft: {
      backgroundColor: colors[theme].messageLeftBg,
      borderColor: colors[theme].messageBorder,
      borderWidth: 0.5,
      borderRadius: 10,
      marginVertical: 5,
      marginRight: 40,
      padding: 10,
    },

    textWrapper: {
    },

    dateWrapper: {
      position: 'absolute',
      bottom: 6,
      right: 10,
    },
  });
};
