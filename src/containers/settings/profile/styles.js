import {colors, getFont, sizes, weights} from '../../../styles';
import {StyleSheet} from 'react-native';

export default (theme) => {
  return StyleSheet.create({
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
  });
};
