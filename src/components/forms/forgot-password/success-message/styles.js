import {StyleSheet} from 'react-native';
import {sizes, colors} from '../../../../styles';

export default (theme) => {
  return StyleSheet.create({
    topBlock: {
      alignItems: 'center',
      marginTop: 162,
    },

    iconContainer: {
      width: 50,
      height: 50,
      position: 'relative',
      borderRadius: 50,
      backgroundColor: colors[theme].blue,
    },

    svgContainer: {
      position: 'absolute',
      top: '28%',
      left: '20%',
    },

    container: {
      height: sizes.windowHeight,
      width: sizes.windowWidth,
      alignItems: 'center',
    },

    wrapper: {
      width: 280,
    },

    title: {
      marginTop: 13,
    },

    description: {
      marginTop: 10,
    },

    buttonContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 22,
    },

    subDescription: {
      width: 130,
      marginTop: 35,
    },

    bottomBlock: {
      alignItems: 'center',
    }
  });
};
