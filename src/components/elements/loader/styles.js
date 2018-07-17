import {StyleSheet} from 'react-native';
import {sizes, colors} from '../../../styles';

export default (theme, inheritSizes) => {
  return StyleSheet.create({
    container: {
      width: inheritSizes ? '100%' : sizes.windowWidth,
      height: inheritSizes ? '100%' : sizes.windowHeight,
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