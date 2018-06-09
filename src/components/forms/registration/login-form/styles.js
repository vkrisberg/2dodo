import {StyleSheet} from 'react-native';
import {colors, fonts, sizes} from '../../../../styles';

export default (theme) => {
  return StyleSheet.create({
    container: {
      height: sizes.windowHeight,
      width: sizes.windowWidth,
      alignItems: 'center',
      paddingHorizontal: 45,
    },

    title: {
      marginTop: 100,
    },

    description: {
      marginTop: 15,
    },

    inputContainer: {
      marginTop: 25,
    },
  });
}
