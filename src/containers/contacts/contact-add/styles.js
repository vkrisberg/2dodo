import {StyleSheet} from 'react-native';

export default (theme) => {
  return StyleSheet.create({
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
      padding: 15,
      width: 260,
    },

    text: {
      marginTop: 15,
      textAlign: 'center',
    },
  });
};