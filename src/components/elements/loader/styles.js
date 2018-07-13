import {StyleSheet} from 'react-native';
import {sizes, colors} from '../../../styles';

export default (theme) => {
  return StyleSheet.create({
    container: {
      width: sizes.windowWidth,
      height: sizes.windowHeight,
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: colors[theme].whiteOpacity,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
    },
  });
};