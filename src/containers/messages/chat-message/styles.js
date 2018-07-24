import {StyleSheet} from 'react-native';
import {sizes} from '../../../styles';

export default StyleSheet.create({
  container: {
    width: sizes.windowWidth,
    flex: 1,
    flexDirection: 'column',
    paddingTop: 5,
  },

  fullWrap: {
    flex: 1,
    width: '100%',
  },

  searchInputContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
});
