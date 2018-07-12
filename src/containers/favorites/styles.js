import {StyleSheet} from 'react-native';
import {getFont, weights} from '../../styles';

export default (theme) => {
  return StyleSheet.create({
    emptyFavoritesView: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },

    boldText: {
      marginTop: 20,
      ...getFont({weight: weights.bold}),
    },
  });
};
