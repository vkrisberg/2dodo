import {colors, sizes, weights} from '../../../styles';
import {StyleSheet} from 'react-native';

export default (theme) => {
  return StyleSheet.create({
    header: {
      width: sizes.windowWidth,
      flexDirection: 'row',
    },

    styledTitle: {
      fontWeight: weights.bold,
      fontSize: 28,
      marginLeft: 20,
      color: colors[theme].navbarTitle,
    },

    titleContainer: {
      width: '100%',
      paddingLeft: 20,
      paddingRight: 10,
      marginTop: 35,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },

    body: {
      width: sizes.windowWidth,
      paddingRight: 10,
      paddingLeft: 10,
      flexDirection: 'column',
      flex: 1,
    },

    bodyProfile: {
      paddingLeft: 0,
      paddingRight: 0,
    },

    editBtn: {
      width: 'auto',
      height: 'auto',
      paddingHorizontal: 10,
      borderWidth: 0,
      justifyContent: 'flex-end',
      position: 'absolute',
      right: 10,
    },
  });
};
