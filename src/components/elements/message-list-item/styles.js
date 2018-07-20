import {StyleSheet} from "react-native";
import {colors, fonts, weights, sizes} from "../../../styles";

export default ({theme}) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },

    containerRight: {
      position: 'relative',
      marginVertical: 5,
      marginLeft: 40,
      marginRight: 10,
    },

    containerLeft: {
      position: 'relative',
      marginVertical: 5,
      marginRight: 40,
      marginLeft: 10,
    },

    avatarContainer: {
      marginRight: 10,
    },

    background: {
      position: 'absolute',
      flex: 1,
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
    },

    wrapper: {
      padding: 10,
      paddingBottom: 30,
    },

    textWrapper: {
    },

    dateWrapper: {
      position: 'absolute',
      bottom: 8,
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
