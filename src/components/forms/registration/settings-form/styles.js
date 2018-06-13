import {StyleSheet} from 'react-native';
import {colors, fonts, sizes} from '../../../../styles';

export default (theme) => {
  return StyleSheet.create({
    container: {
      height: sizes.windowHeight,
      width: sizes.windowWidth,
      alignItems: 'center',
    },

    wrapper: {
      width: 280,
    },

    title: {
      marginTop: 95,
    },

    description: {
      marginTop: 10,
    },

    avatarContainer: {
      marginTop: 25,
      alignItems: 'center',
    },

    avatarLabel: {
      marginTop: 5,
    },

    themeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 30,
    },

    inputContainer: {
      marginTop: 30,
    },

    buttonContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 15,
    },

    button: {
      marginTop: 25,
    },
  });
}
