import {StyleSheet} from 'react-native';
import {colors, fonts, weights} from '../../../styles';

export default ({theme, acceptButtonColor, cancelButtonColor}) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      position: 'absolute',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      backgroundColor: 'transparent',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },

    overlay: {
      flex: 1,
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },

    modalContent: {
      position: 'relative',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: colors[theme].white,
      borderRadius: 10,
      paddingHorizontal: 15,
      margin: 10,
      opacity: 1,
      height: 175,
    },

    textWrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },

    description: {
      textAlign: 'center',
      marginTop: 15,
    },

    buttonsWrapper: {
      flexDirection: 'row',
    },

    acceptButton: {
      flex: 1,
      borderRadius: 0,
      borderWidth: 0,
      borderTopWidth: 1,
      borderRightWidth: 1,
      borderColor: colors[theme].grayLight,
      height: 50,
    },

    acceptButtonText: {
      fontSize: 15,
      color: acceptButtonColor,
    },

    cancelButton: {
      flex: 1,
      borderRadius: 0,
      borderWidth: 0,
      borderTopWidth: 1,
      borderColor: colors[theme].grayLight,
      height: 50,
    },

    cancelButtonText: {
      color: cancelButtonColor,
      fontSize: 15,
    },
  });
};
