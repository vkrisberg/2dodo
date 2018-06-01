import styled from 'styled-components';

export const StyledTitle = styled.Text`
  font-weight: bold;
  font-size: 30px;
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