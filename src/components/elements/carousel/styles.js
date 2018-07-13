import {StyleSheet} from 'react-native';
import {colors, getFont, weights, sizes} from '../../../styles';

export default (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },

    titleText: {
      fontSize: 18,
      textAlign: 'center',
      color: colors[theme].white,
      marginTop: 30,
      ...getFont({weight: weights.bold}),
    },

    itemText: {
      fontSize: 15,
      lineHeight: 18,
      marginTop: 12,
      textAlign: 'center',
      color: colors[theme].white,
      paddingHorizontal: 50,
      ...getFont({}),
    },

    itemWrap: {
      width: sizes.windowWidth,
      alignItems: 'center',
    },

    barContainer: {
      position: 'absolute',
      zIndex: 2,
      flexDirection: 'row',
    },

    track: {
      backgroundColor: colors[theme].whiteMoreOpacity,
      overflow: 'hidden',
      width: 7,
      height: 7,
      borderRadius: 14,
    },

    bar: {
      backgroundColor: colors[theme].white,
      width: 7,
      height: 7,
      position: 'absolute',
      left: 0,
      top: 0,
    },
  });
};
