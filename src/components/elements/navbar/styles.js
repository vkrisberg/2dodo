import {StyleSheet} from 'react-native';
import {weights, colors, sizes, getFont} from '../../../styles';

export default ({theme}) => {
  return StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: sizes.windowWidth,
      height: sizes.navbarHeight,
      paddingTop: sizes.statusbarHeight,
    },

    titleContainer: {
      flex: 1,
    },

    title: {
      color: colors[theme].navbarTitle,
      fontSize: 28,
      marginLeft: 5,
      ...getFont({weight: weights.bold}),
    },
  });
};
