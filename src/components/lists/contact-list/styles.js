import {StyleSheet} from 'react-native';
import {colors, weights, getFont} from '../../../styles';

export default (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
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

    searchResult: {
      marginLeft: 10,
      marginVertical: 10,
    },

    sectionContainer: {
      flex: 1,
      width: '100%',
      marginTop: 12,
      flexDirection: 'row',
    },

    sectionHeader: {
      marginVertical: 3,
      flexDirection: 'row',
      alignItems: 'center',
    },

    sectionLeft: {
      marginRight: 7,
      fontSize: 13,
      color: colors[theme].grayQuartz,
      ...getFont({weight: weights.bold}),
    },

    alphabet: {
      width: 20,
      marginTop: 13,
    },

    alphabetLetter: {
      fontSize: 10,
      color: colors[theme].grayLightQuartz,
      height: 23,
      textAlign: 'right',
      ...getFont({}),
    },

    divider: {
      width: '100%',
      borderTopWidth: 1,
      borderColor: colors[theme].grayLight,
    },
  });
};
