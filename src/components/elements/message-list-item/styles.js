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
      paddingBottom: 30,
    },

    containerLeft: {
      backgroundColor: colors[theme].messageLeftBg,
      borderColor: colors[theme].messageBorder,
      borderWidth: 0.5,
      borderRadius: 10,
      marginVertical: 5,
      marginRight: 40,
      padding: 10,
      paddingBottom: 30,
    },

    textWrapper: {
    },

    dateWrapper: {
      position: 'absolute',
      bottom: 4,
      right: 4,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 3,
      paddingHorizontal: 5,
      borderRadius: 15,
      backgroundColor: colors[theme].whiteOpacity,
    },

    statusIcon: {
      marginRight: 3,
    },
  });
};
