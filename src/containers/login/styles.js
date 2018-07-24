import {StyleSheet, Platform} from 'react-native';
import {colors, getFont, sizes} from '../../styles';

export default (theme) => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },

    logo: {
      marginTop: 60,
    },

    forgot: {
      marginTop: 15,
    },

    keysImportContainer: {
      width: 315,
      borderTopWidth: 1,
      borderColor: colors.light.loginBorder,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 15,
    },

    keysImportButton: {
      borderWidth: 0,
      height: 'auto',
      padding: 10,
      marginTop: sizes.isIphone5 ? 0 : 5,
    },

    text: {
      color: colors[theme].white,
      fontSize: 15,
      textAlign: 'center',
      marginTop: 18,
      marginBottom: 30,
      ...getFont({}),
    },

    registration: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: sizes.isIphone5 ? 0 : 65,
    },

    registrationLabel: {
      color: colors[theme].grayDarker,
      fontSize: 15,
      ...getFont({}),
    },
  });
};
