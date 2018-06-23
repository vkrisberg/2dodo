import {colors, fonts, weights} from "../../../styles";
import {StyleSheet} from "react-native";

export default (theme) => {
  return StyleSheet.create({
    wrapper: {
      width: '100%',
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 5,
    },

    image: {
      width: 50,
      height: 50,
      backgroundColor: colors[theme].grayGainsborough,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },

    body: {
      height: '100%',
      marginLeft: 15,
      flex: 1,
      justifyContent: 'center',
    },

    name: {
      fontFamily: fonts.main,
      fontWeight: weights.semiBold,
      fontSize: 16,
      color: colors[theme].grayBlue,
    },

    chosen: {
      marginBottom: -6,
      marginRight: 13,
    },

    swipeOut: {
      backgroundColor: 'transparent',
    },

    btnContainer: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
  });
};
