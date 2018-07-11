import {StyleSheet} from 'react-native';
import {colors, sizes} from '../../../styles';

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

    topBlock: {
      alignItems: 'center',
      marginTop: 162,
    },

    iconContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors[theme].blue,
      alignItems: 'center',
      justifyContent: 'center',
    },

    title: {
      marginTop: 105,
    },

    successTitle: {
      marginTop: 13,
    },

    subDescription: {
      width: 130,
      marginTop: 35,
    },

    textContainer: {
      alignItems: 'center',
      marginTop: 10,
    },

    inputContainer: {
      marginTop: 20,
    },

    emailInputContainer: {
      marginTop: 23,
    },

    description: {
      width: 205,
    },

    emailDescription: {
      marginTop: 15,
    },

    successDescription: {
      marginTop: 10,
    },

    bottomBlock: {
      alignItems: 'center',
    },

    buttonContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 15,
    },
  });
};
