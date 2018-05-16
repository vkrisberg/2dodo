import styled from 'styled-components';

export const StyledTitle = {
  'padding-top': '80px'
};

export const Description = styled.Text`
  align-self: center;
  text-align: center;
  margin: 0 26px;
  width: 280;
  margin-bottom: ${props => props.marginBottom || 0}
`;

export const DescriptionWrapper = styled.View`
  width: 100;
  margin-bottom: 25;
`;

export const ThemeButton = styled.TouchableOpacity`
  width: 140;
  height: 43;
  justify-content: center;
  border-radius: 70;
  background-color: ${props => props.night ? 'black' : '#f4f4f4'}
  margin-right: ${props => props.marginRight || 0};
`;

export const ThemeButtonText = styled.Text`
  align-self: flex-start;
  margin-left: 15;
  color: ${props => props.night ? 'white' : 'black'}
`;

export const ButtonWrapper = styled.View`
  flex-wrap: wrap;
  align-items: flex-start;
  flex-direction: row;
  margin-bottom: 30;
`;

export const StyledImage = styled.View`
  width: 70;
  height: 70;
  background-color: #e4e4e4;
  margin-bottom: 15;
  border-radius: 70;
`;

export const Container = styled.View`
  align-items: center;
`;
