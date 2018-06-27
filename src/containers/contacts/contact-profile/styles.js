import {StyleSheet} from 'react-native';
import {colors, fonts, sizes, weights} from '../../../styles';

export default (theme) => {
  return StyleSheet.create({
    header: {
      width: sizes.windowWidth,
      flexDirection: 'row',
    },

    body: {
      width: sizes.windowWidth,
      paddingRight: 10,
      paddingLeft: 10,
      flexDirection: 'column',
      flex: 1,
    },

    bodyProfile: {
      paddingLeft: 0,
      paddingRight: 0,
    },

    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    infoBlock: {
      flexDirection: 'column',
      alignItems: 'center',
      width: 240,
      padding: 10,
    },

    infoText: {
      marginTop: 20,
      textAlign: 'center',
      color: colors[theme].grayDarker,
      fontSize: 15,
      fontWeight: weights.medium,
      fontFamily: fonts.main,
    },
  });
};
