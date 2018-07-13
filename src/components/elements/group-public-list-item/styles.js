import {StyleSheet} from 'react-native';
import {colors, getFont, weights} from '../../../styles';

export default (theme) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
      height: 50,
      marginVertical: 8,
    },

    checkboxBlock: {
      justifyContent: 'center',
      marginRight: 13,
    },

    image: {
      width: 50,
      height: 50,
      position: 'relative',
      flexShrink: 0,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },

    avatarBg: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },

    avatar: {
      minWidth: '100%',
      minHeight: '100%',
    },

    avatarInitials: {
      color: colors[theme].white,
      fontSize: 16,
      ...getFont({weight: weights.semiBold}),
    },

    body: {
      flex: 1,
      marginLeft: 15,
    },

    defaultText: {
      fontSize: 13,
      ...getFont({}),
    },

    caption: {
      color: colors[theme].grayBlue,
      fontSize: 16,
      marginBottom: 2,
      ...getFont({weight: weights.semiBold}),
    },

    subCaption: {
      color: colors[theme].grayBlue,
      marginBottom: 2,
    },

    text: {
      color: colors[theme].grayInput,
      fontSize: 13,
      ...getFont({}),
    },
  });
};
