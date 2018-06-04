import styled from 'styled-components';

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
