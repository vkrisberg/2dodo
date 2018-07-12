import {StyleSheet} from 'react-native';
import {colors, getFont} from '../../../styles';

export default (theme) => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      width: 280,
    },

    securityContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 0,
      marginBottom: 25,
    },

    text: {
      fontSize: 15,
      color: colors[theme].white,
      ...getFont({}),
    },

    securityText: {
      opacity: .6,
    },
  });
};
