import {StyleSheet} from 'react-native';
import {colors, fonts, weights, sizes} from '../../../styles';

export default ({theme}) => {
  return StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      height: sizes.navbarHeight,
      paddingTop: sizes.statusbarHeight,
    },

    titleContainer: {
      flex: 1,
    },

    title: {
      color: colors[theme].navbarTitle,
      fontFamily: fonts.main,
      fontSize: 28,
      fontWeight: weights.bold,
      marginLeft: 5,
    },
  });
}
