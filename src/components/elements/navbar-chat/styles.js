import {StyleSheet} from 'react-native';
import {colors, fonts, sizes, weights} from '../../../styles';

export default ({theme}) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: sizes.appbarHeight,
      marginLeft: 5,
    },

    titleContainer: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },

    menuContainer: {
      height: sizes.appbarHeight,
      paddingHorizontal: 15,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 10,
    },

    menuDots: {},

    avatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
    },
  });
}
