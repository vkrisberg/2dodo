import {StyleSheet} from 'react-native';
import {colors} from '../../../styles';

export default (theme) => {
  return StyleSheet.create({
    inputContainer: {
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },

    input: {
      color: colors[theme].grayBlue,
      borderRadius: 0,
      borderWidth: 0,
      borderBottomWidth: 2,
      paddingHorizontal: 0,
      marginBottom: 0,
    },
  });
};
