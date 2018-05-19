import styled from 'styled-components';

export const StyledTitle = styled.Text`
  font-weight: bold;
  font-size: 30px;
  color: #333;
  padding: 30px 20px;
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
`;

export const TitleContainer = styled.View`
  width: 50%;
`;

export const AddContact = styled.View`
  width: 46.5%;
  justify-content: center;
  align-items: flex-end;
  padding-right: 3.5%;
`;

export const AddContactText = styled.Text`
  color: blue;
  font-size: 30px;
  text-align: right;
`;

export const EmptyContactsView = styled.View`
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 45%;
`;

export const BoldText = styled.Text`
  font-weight: bold;
  margin-top: 20px;
`;
