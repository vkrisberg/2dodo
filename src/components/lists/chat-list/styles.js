import {StyleSheet} from 'react-native';
import {sizes} from '../../../styles';

export default (verticalOffset) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      // height: sizes.windowHeight - sizes.navbarHeight - verticalOffset,
      // width: sizes.windowWidth,
    },
  });
}
