import {StyleSheet} from 'react-native';

export default ({theme}) => {
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
  });
}
