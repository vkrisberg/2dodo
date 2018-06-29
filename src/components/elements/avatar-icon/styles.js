import {StyleSheet} from 'react-native';
import {colors} from '../../../styles';

export default ({theme, width, height}) => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors[theme].blue,
      borderRadius: height / 2,
      height: height,
      width: width,
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
      width: width,
      height: height,
    },

    avatarBg: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: width,
      height: height,
    },
  });
}
