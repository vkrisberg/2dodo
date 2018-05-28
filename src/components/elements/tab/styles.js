import styled from 'styled-components';

export const Container = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-bottom: 25;
`;

export const StyledText = styled.Text`
  font-size: 11;
  color: ${props => props.color};
  position: absolute;
  bottom: 10;
`;