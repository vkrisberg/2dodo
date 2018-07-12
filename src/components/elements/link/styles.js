import {StyleSheet} from 'react-native';
import {getFont} from '../../../styles';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
  },

  link: {
    fontSize: 15,
    ...getFont({}),
  },
});
