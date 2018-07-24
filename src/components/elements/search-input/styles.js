import {StyleSheet} from "react-native";
import {colors, getFont, weights} from '../../../styles';

export default (theme) => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: 30,
      backgroundColor: colors[theme].grayBg,
      borderRadius: 15,
      marginTop: 10,
    },

    placeholder: {
      position: 'absolute',
    },

    searchIcon: {
      position: 'absolute',
      left: 10,
    },

    closeIcon: {
      position: 'absolute',
      padding: 10,
      right: 0,
      zIndex: 9,
    },

    inputContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 35,
      width: '100%',
    },

    input: {
      color: colors[theme].grayBlue,
      fontSize: 13,
      height: 30,
      width: '100%',
      padding: 0,
      ...getFont({weight: weights.regular}),
    },
  });
};
