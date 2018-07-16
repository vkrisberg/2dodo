import {StyleSheet} from 'react-native';
import {colors, weights, sizes, getFont} from '../../../styles';

export default (theme) => {
  return StyleSheet.create({
    wrapper: {
      flex: 1,
    },

    container: {
      width: sizes.windowWidth,
      flex: 1,
    },

    header: {
      width: '100%',
      paddingLeft: 10,
      paddingRight: 20,
      marginTop: 20,
      flexDirection: 'row',
    },

    info: {
      marginLeft: 20,
      marginTop: -10,
      flex: 1,
    },

    avatar: {
      marginRight: 20,
      flexShrink: 0,
    },

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

    btn: {
      width: '100%',
      alignItems: 'flex-start',
      borderWidth: 0,
      marginTop: 10,
    },

    text: {
      fontSize: 14,
      color: colors[theme].grayInput,
      padding: 10,
      paddingBottom: 5,
      ...getFont({}),
    },

    btnContainer: {
      width: '100%',
      height: 90,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      left: 0,
      backgroundColor: colors[theme].bgMain,
    },
  });
};
