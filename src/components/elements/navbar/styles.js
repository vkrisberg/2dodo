import {StyleSheet} from 'react-native';
import {fontMaker} from '../../../utils/fonts';
import {colors, sizes} from '../../../styles';

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
      ...fontMaker({weight: 'Bold'}),
    },
  });
};
