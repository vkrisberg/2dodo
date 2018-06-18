import {StyleSheet} from 'react-native';
import {sizes} from '../../../styles';

export default ({theme}) => {
  return StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingTop: 4,
      paddingRight: 10,
      height: sizes.appbarHeight,
      width: sizes.appbarHeight,
    },
  });
}
