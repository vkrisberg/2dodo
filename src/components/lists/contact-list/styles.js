import {StyleSheet} from "react-native";
import {colors, fonts, weights} from "../../../styles";

export default (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
    },

    emptyContainer: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 50,
    },

    emptyWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
    },

    text: {
      marginTop: 15,
    },

    searchResult: {
      marginLeft: 10,
      marginVertical: 10,
    },

    sectionContainer: {
      flex: 1,
      width: '100%',
      marginTop: 12,
      flexDirection: 'row',
    },

    sectionHeader: {
      marginVertical: 3,
      flexDirection: 'row',
      alignItems: 'center',
    },

    sectionLeft: {
      marginRight: 7,
      fontFamily: fonts.main,
      fontSize: 13,
      fontWeight: weights.bold,
      color: colors[theme].grayQuartz,
    },

    alphabet: {
      width: 20,
      marginTop: 13,
    },

    alphabetLetter: {
      fontFamily: fonts.main,
      fontWeight: weights.medium,
      fontSize: 10,
      color: colors[theme].grayLightQuartz,
      marginBottom: 11,
      textAlign: 'right',
    },

    divider: {
      width: '100%',
      borderTopWidth: 1,
      borderColor: colors[theme].grayLight,
    },
  });
};
