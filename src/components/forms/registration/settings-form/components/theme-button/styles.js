import styled from 'styled-components';

export const ThemeButtonContainer = styled.TouchableOpacity`
  width: 140;
  height: 43;
  align-items: center;
  border-radius: 70;
  flex-direction: row;
  background-color: ${props => props.night ? 'black' : '#f4f4f4'}
  margin-right: ${props => props.marginRight || 0};
`;

export const ThemeButtonText = styled.Text`
  margin-right: 60;
  margin-left: 15;
  color: ${props => props.night ? 'white' : 'black'}
`;