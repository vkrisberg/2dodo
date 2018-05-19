import styled from 'styled-components';

export const Wrapper = styled.View`
  ${({style}) => style && style}
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20;
`;

export const StyledText = styled.Text`
  ${({textStyle}) => textStyle && textStyle}
  font-size: 25;
`;
