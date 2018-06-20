import {StyleSheet} from 'react-native';
import {colors, fonts, sizes, weights} from '../../../../styles';

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

    serverInput: {
      marginTop: 15,
      marginBottom: 0,
    },

    inputContainer: {
      marginTop: 25,
    },

    checkboxContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
    },

    buttonContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 25,
    },

    skipContainer: {
      position: 'absolute',
      bottom: 0,
    },

    phoneInput: {
      paddingLeft: 95,
      paddingRight: 20,
    },

    phonePrefixContainer: {
      position: 'absolute',
      left: 0,
      top: 0,
      height: 40,
      paddingLeft: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },

    phonePrefixPipe: {
      marginLeft: 8,
      fontSize: 24,
      fontWeight: weights.light,
    },
  });
}
