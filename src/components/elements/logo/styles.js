import styled from 'styled-components';

export const LogoContainer = styled.View`
  height: 80;
  width: 80;
  align-items: center;
  justify-content: center;
  margin-top: ${props => props.isFlex ? 0 : 80};
  flex: ${props => props.isFlex ? 1 : 0}
  ${({style}) => style && style}
`;

export const LogoIcon = styled.Image`
  width: 80;
  height: 80;
  margin-bottom: 20;
`;

export const LogoTitleIcon = styled.Image`
  width: 122;
  height: 31;
`;
