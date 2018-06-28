import {StyleSheet} from 'react-native';

export default (theme) => {
  return StyleSheet.create({
    quoteContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      borderRadius: 10,
      padding: 13,
      marginBottom: 10,
    },

    quoteBlock: {
      flexDirection: 'column',
      flexShrink: 1,
      marginLeft: 11,
    },

    name: {
      marginBottom: 5,
    },
  });
};
