import {StyleSheet} from 'react-native';
import {colors, fonts, weights, sizes} from '../../../styles';

export default (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      marginTop: 14,
      paddingHorizontal: 10,
    },

    emptyBlockWrap: {
      width: sizes.windowWidth,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    emptyBlock: {
      flexDirection: 'column',
      alignItems: 'center',
      padding: 10,
    },

    text: {
      color: colors[theme].messageTextMain,
      fontSize: 15,
      fontWeight: weights.medium,
      fontFamily: fonts.main,
    }
  });
};
