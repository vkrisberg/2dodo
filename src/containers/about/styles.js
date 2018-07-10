import {StyleSheet} from 'react-native';
import {fonts, weights, colors, sizes} from '../../styles';

export default (theme) => {
  return StyleSheet.create({
    container: {
      width: sizes.windowWidth,
      paddingHorizontal: 20,
    },

    header: {
      paddingTop: 10,
      paddingBottom: 27,
      flexDirection: 'column',
      alignItems: 'center',
    },

    logoContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 26,
    },

    logoIcon: {
      marginRight: 17,
    },

    logoText: {
      marginBottom: 8,
    },

    textContainer: {
      marginBottom: 15,
    },

    defaultText: {
      fontFamily: fonts.main,
      fontSize: 15,
      fontWeight: weights.medium,
      color: colors[theme].messageTextMain,
    },

    smallerText: {
      fontSize: 14,
    },

    grayText: {
      color: colors[theme].grayCement,
    },

    blueText: {
      color: colors[theme].blueCornFlower,
    },

    buttonApp: {
      width: '80%',
      borderWidth: 0,
    },

    caption: {
      fontFamily: fonts.main,
      fontSize: 19,
      fontWeight: weights.bold,
      color: colors[theme].navbarTitle,
    },

    bottomBlock: {
      width: sizes.windowWidth,
      position: 'absolute',
      left: 0,
      bottom: 0,
      backgroundColor: colors[theme].bgMain,
      paddingHorizontal: 20,
    },

    buttonGitHub: {
      width: '100%',
      borderWidth: 0,
      alignItems: 'flex-start',
    },
  });
};
