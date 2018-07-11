import {StyleSheet} from 'react-native';
import {colors} from '../../../styles';

export default (theme) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
      borderBottomWidth: 1,
      borderBottomColor: colors[theme].grayLight,
      marginHorizontal: 10,
    },
  });
};
