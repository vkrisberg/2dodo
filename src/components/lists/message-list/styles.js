import {StyleSheet} from 'react-native';
import {sizes} from '../../../styles';

export default (verticalOffset) => {
  return StyleSheet.create({
    container: {
      height: sizes.windowHeight - sizes.navbarHeight - verticalOffset,
      width: sizes.windowWidth,
    },
  });
}
