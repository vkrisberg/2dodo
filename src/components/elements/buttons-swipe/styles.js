import {StyleSheet} from 'react-native';

export default (theme) => {
  return StyleSheet.create({
    btnContainer: {
      height: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },

    btn: {
      marginRight: 13,
    },
  });
};
