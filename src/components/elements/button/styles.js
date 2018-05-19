import styled from 'styled-components';

const getColor = ({ color }) => color || 'white';

export const Container = styled.View`
  align-items: center;
  ${props => props.style && props.style}
`;

export const StyledButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-color: ${props => getColor(props)};
  border-width: 2;
  background-color: transparent;
  width: 205;
  height: 50;
  padding: 10px;
  border-radius: 70;
  ${props => props.wrapperStyle && props.wrapperStyle}
`;

export const ButtonText = styled.Text`
  color: ${props => getColor(props)};
  ${props => props.textStyle && props.textStyle}
`;
