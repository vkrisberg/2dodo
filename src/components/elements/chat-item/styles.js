import styled from 'styled-components';
import {colors, fonts, weights} from "../../../styles";
import {StyleSheet} from "react-native";

export const ChatChosen = {
  marginBottom: -6
};

export default (theme) => {
  return StyleSheet.create({
    avatarContainer: {
      width: 340,
      height: 50,
      marginVertical: 8,
      marginHorizontal: 'auto',
      flexDirection: 'row',
    },

    image: {
      width: 50,
      height: 50,
      flexShrink: 0,
      borderRadius: 50,
      marginLeft: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors[theme].blue,
      overflow: 'hidden',
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
      marginLeft: 15,
      flexGrow: 0,
      width: 205,
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
