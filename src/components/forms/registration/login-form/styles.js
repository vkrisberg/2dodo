import {StyleSheet} from 'react-native';
import {colors, fonts, sizes} from '../../../../styles';

export default (theme) => {
  return StyleSheet.create({
    container: {
      height: sizes.windowHeight,
      width: sizes.windowWidth,
      alignItems: 'center',
      paddingHorizontal: 40,
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
      marginTop: 10,
    },

    buttonContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30,
    },
  });
}
