import {StyleSheet} from "react-native";
import {colors, fonts, weights, sizes} from "../../../styles";

export const ChatChosen = {
  marginBottom: -6
};

export default (theme) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: 50,
      width: sizes.windowWidth - 20,
      marginVertical: 8,
      paddingHorizontal: 10,
    },

    checkboxBlock: {
      justifyContent: 'center',
      marginRight: 13,
    },

    image: {
      width: 50,
      height: 50,
      position: 'relative',
      flexShrink: 0,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },

    avatarBg: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },

    avatar: {
      minWidth: '100%',
      minHeight: '100%',
    },

    avatarInitials: {
      color: colors[theme].white,
      fontFamily: fonts.main,
      fontSize: 16,
      fontWeight: weights.semiBold,
    },

    body: {
      flex: 1,
      marginLeft: 15,
    },

    name: {
      color: colors[theme].grayBlue,
      fontFamily: fonts.main,
      fontSize: 16,
      fontWeight: weights.semiBold,
    },

    text: {
      color: colors[theme].grayText,
      fontFamily: fonts.main,
      fontSize: 13,
      fontWeight: weights.medium,
    },

    notReadenMessage: {
      height: 20,
      paddingHorizontal: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      marginTop: 8,
      backgroundColor: colors[theme].blue,
    },

    notReadenMessageText: {
      color: colors[theme].white,
      fontFamily: fonts.main,
      fontSize: 13,
      fontWeight: weights.medium,
    },

    information: {
      height: '100%',
      width: 50,
      flexShrink: 0,
      alignItems: 'flex-end',
      marginLeft: 5,
    },

    limitText: {
      color: colors[theme].grayText,
      fontFamily: fonts.main,
      fontSize: 13,
      fontWeight: weights.medium,
      height: 30,
      overflow: 'hidden',
    },
  });
};
