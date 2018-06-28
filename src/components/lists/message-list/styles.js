import {StyleSheet} from 'react-native';
import {sizes} from '../../../styles';

export default ({theme, verticalOffset}) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      // height: sizes.windowHeight - sizes.navbarHeight - verticalOffset,
      width: '100%',
      paddingHorizontal: 10,
    },

    emptyContainer: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 50,
    },

    emptyWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
    },

    text: {
      marginTop: 15,
    },
  });
}
