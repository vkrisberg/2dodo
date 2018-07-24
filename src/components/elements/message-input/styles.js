import {StyleSheet} from 'react-native';
import {colors, getFont, sizes} from '../../../styles';

const HEIGHT = 44;

export default ({theme}) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors[theme].messageInputBg,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: HEIGHT,
      width: sizes.windowWidth,
    },

    leftButton: {
      borderWidth: 0,
      height: HEIGHT,
      width: HEIGHT,
    },

    rightButton: {
      borderWidth: 0,
      height: HEIGHT,
      width: HEIGHT,
    },

    input: {
      flex: 1,
      color: colors[theme].messageTextMain,
      backgroundColor: colors[theme].white,
      fontSize: 15,
      borderWidth: 0.5,
      borderRadius: 20,
      borderColor: colors[theme].messageBorder,
      marginHorizontal: 5,
      paddingHorizontal: 20,
      height: 32,
      width: '100%',
      padding: 0,
      ...getFont({}),
    },

    clipButton: {
      height: 32,
      width: 32,
      borderRadius: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },

    microphoneButton: {
      height: 32,
      width: 32,
      borderRadius: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },

    textButton: {
      backgroundColor: colors[theme].messageTextBtnBg,
      height: 32,
      width: 32,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },

    recordingButton: {
      backgroundColor: colors[theme].messageAudioBtnBg,
      height: 32,
      width: 32,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },

    quoteContainer: {
      borderTopWidth: 1,
      borderTopColor: colors[theme].grayLight,
    },

    quote: {
      borderRadius: 0,
      marginBottom: 0,
      paddingHorizontal: 10,
    },
  });
};
