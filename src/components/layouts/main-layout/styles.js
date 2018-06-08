import {StyleSheet} from 'react-native';
import {colors} from '../../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  netinfo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  netinfoText: {
    color: colors.red,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
