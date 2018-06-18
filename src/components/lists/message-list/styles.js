import {StyleSheet} from 'react-native';
import {sizes} from '../../../styles';

export default ({theme, verticalOffset}) => {
  return StyleSheet.create({
    container: {
      height: sizes.windowHeight - sizes.navbarHeight - verticalOffset,
      width: sizes.windowWidth,
    },

    emptyContainer: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 50,
    },

    text: {
      marginTop: 15,
    },
  });
}
