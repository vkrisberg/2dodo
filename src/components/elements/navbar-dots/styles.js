import {StyleSheet} from 'react-native';
import {sizes} from '../../../styles';

export default ({theme}) => {
  return StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: 4,
      paddingLeft: 20,
      height: sizes.appbarHeight,
      width: 42,
    },
  });
}
