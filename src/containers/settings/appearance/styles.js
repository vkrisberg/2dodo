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
      marginVertical: 5,
    },

    text: {
      fontFamily: fonts.main,
      fontSize: 15,
      fontWeight: weights.medium,
      color: colors[theme].grayInput,
    },

    btnsThemeContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 10,
      paddingBottom: 20,
    },

    btnLightTheme: {
      marginRight: 12,
    },

    btnsFontContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 15,
      paddingBottom: 25,
      paddingHorizontal: 5,
      borderBottomWidth: 1,
      borderBottomColor: colors[theme].grayLight,
    },

    btnSize: {
      width: 'auto',
      borderWidth: 0,
      paddingHorizontal: 20,
    },

    btnSizeActive: {
      backgroundColor: colors[theme].blue,
      flexShrink: 0,
    },
  });
};
