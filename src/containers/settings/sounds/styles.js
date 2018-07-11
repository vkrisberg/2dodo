import {StyleSheet} from 'react-native';
import {colors, sizes, getFont} from "../../../styles";

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
      marginTop: 10,
      marginBottom: 5,
      marginHorizontal: 20,
    },

    text: {
      fontSize: 15,
      color: colors[theme].grayInput,
      ...getFont({}),
    },

    divider: {
      width: sizes.windowWidth,
      height: 15,
      backgroundColor: colors[theme].blueKrayolaDim,
    },
  });
};
