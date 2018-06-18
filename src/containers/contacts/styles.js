import styled from 'styled-components';
import {colors, fonts, sizes, weights} from "../../styles";
import {StyleSheet} from "react-native";

export const StyledTitle = styled.Text`
  font-weight: bold;
  font-size: 26;
  color: #333;
  margin-left: ${props => props.marginLeft || 0};
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
`;

export const TitleContainer = styled.View`
  width: ${props => props.width || '50%'};
  padding: 30px 20px;
  flex-direction: row;
  align-items: center;
`;

export const AddButton = styled.View`
  width: 40%;
  justify-content: center;
  align-items: flex-end;
  padding-right: 20;
`;

export const SearchText = styled.Text`
  color: #62a3ff;
  font-size: 18px;
  margin-top: 7px;
`;

export const StyledIcon = styled.View`
  position: absolute;
  top: 36px;
  left: 20px;
`;

export default (theme) => {
  return StyleSheet.create({
    header: {
      width: sizes.windowWidth,
      flexDirection: 'row'
    },

    styledTitle: {
      fontWeight: weights.bold,
      fontSize: 28,
      marginLeft: 20,
      color: colors[theme].navbarTitle,
    },

    titleContainer: {
      width: '100%',
      paddingLeft: 20,
      paddingRight: 10,
      marginTop: 35,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },

    body: {
      width: sizes.windowWidth,
      paddingRight: 10,
      paddingLeft: 10,
      flexDirection: 'column',
      flex: 1
    },

    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    infoBlock: {
      flexDirection: 'column',
      alignItems: 'center',
      width: 220,
    },

    infoText: {
      marginTop: 20,
      textAlign: 'center',
      color: colors[theme].grayDarker,
      fontSize: 15,
      fontWeight: weights.medium,
      fontFamily: fonts.main,
    },
  });
};
