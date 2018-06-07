import {StyleSheet} from 'react-native';
import {color} from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    position: 'absolute',
    alignSelf: 'center',
    color: color.white,
    bottom: 65,
  },
});
