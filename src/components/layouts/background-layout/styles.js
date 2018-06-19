import {StyleSheet} from 'react-native';
import {colors, sizes} from '../../../styles';

export default ({theme, paddingHorizontal, paddingVertical}) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: colors[theme].bgMain,
      paddingHorizontal: paddingHorizontal,
      paddingVertical: paddingVertical,
    },

    image: {
      position: 'absolute',
      top: 0,
      left: 0,
    },
  });
}
