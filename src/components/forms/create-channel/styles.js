import {StyleSheet} from 'react-native';
import {colors, getFont} from '../../../styles';

export default (theme) => {
  return StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      paddingHorizontal: 10,
      marginTop: 10,
    },

    fieldsContainer: {
      flex: 1,
    },

    text: {
      color: colors[theme].messageTextMain,
      fontSize: 15,
      ...getFont({}),
    },

    input: {
      color: colors[theme].grayBlue,
      borderRadius: 0,
      borderWidth: 0,
      borderBottomWidth: 2,
      paddingHorizontal: 0,
      marginBottom: 0,
    },

    privateBlock: {
      marginTop: 20,
      marginBottom: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    btnContainer: {
      width: '100%',
      paddingVertical: 25,
      alignItems: 'center',
    },

    btn: {
      width: '74%',
    },

    btnText: {
      color: colors[theme].black,
      fontSize: 16,
      ...getFont({}),
    },
  });
};
