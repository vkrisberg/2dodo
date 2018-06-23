import {StyleSheet} from 'react-native';
import {colors} from '../../../styles';

export default ({theme}) => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors[theme].blue,
      borderRadius: 25,
      height: 50,
      width: 50,
      overflow: 'hidden',
    },

    labelContainer: {
      flex: 1,
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },

    avatar: {
      width: 50,
      height: 50,
    },

    avatarBg: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 50,
      height: 50,
    },
  });
}
