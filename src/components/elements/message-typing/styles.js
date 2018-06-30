import {StyleSheet} from 'react-native';
import {colors} from '../../../styles';

export default (theme) => {
  return StyleSheet.create({
    container: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      height: 30,
      marginLeft: 10,
    },

    typingContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },

    circle: {
      borderRadius: 5,
      backgroundColor: colors[theme].messageTextSecond,
      width: 5,
      height: 5,
      marginLeft: 3,
    },

    text: {
      marginLeft: 10,
    },
  });
};
