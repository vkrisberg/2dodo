import {StyleSheet} from 'react-native';
import {getFont} from '../../../styles';

export default (theme) => {
  return StyleSheet.create({
    skipWrapper: {
      flexDirection: 'row',
      padding: 15,
    },

    text: {
      marginRight: 8,
      ...getFont({}),
    },

    svg: {
      marginTop: 5,
    },
  });
};
