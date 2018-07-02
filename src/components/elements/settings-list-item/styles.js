import {StyleSheet} from 'react-native';
import {colors, fonts, weights} from '../../../styles';

export default (theme) => {
  return StyleSheet.create({
    defaultText: {
      fontFamily: fonts.main,
      fontSize: 15,
      fontWeight: weights.medium,
    },

    blackText: {
      color: colors[theme].blackText,
    },

    grayText: {
      color: colors[theme].grayInput,
    },

    settingsRowContainer: {
      width: '100%',
      paddingHorizontal: 20,
    },

    settingsRow: {
      paddingVertical: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: colors[theme].grayLight,
    },

    settingsRowRight: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },

    arrowIcon: {
      marginLeft: 13,
    },
  });
};
