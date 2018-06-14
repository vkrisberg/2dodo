import {StyleSheet} from 'react-native';
import {sizes} from '../../../../styles';

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
      marginTop: 105,
    },

    textContainer: {
      alignItems: 'center',
      marginTop: 10,
    },

    description: {
      width: 205,
    },

    inputContainer: {
      marginTop: 20,
    },

    buttonContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 15,
    },
  });
};
