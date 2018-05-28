import styled from 'styled-components';

export const Contact = styled.View`
  width: 92%;
  height: 56px;
  margin-vertical: 8px;
  margin-horizontal: auto;
  flex-direction: row;
  justify-content: center;
`;

export const ContactChosen = {
  marginBottom: -6
};

export const ContactImage = styled.View`
  width: 56px;
  height: 56px;
  background-color: #e4e4e4;
  border-radius: 50;
  margin-left: 8px;
  align-items: center;
  justify-content: center;
`;

export const ContactInformation = styled.View`
  height: 56px;
  margin-left: 16px;
`;

export const ContactBody = ContactInformation.extend`
  width: 245;
  justify-content: center;
`;

export const ContactName = styled.Text`
  font-weight: bold;
  align-self: flex-start;
  font-size: 16px;
`;

export const ContactMessage = styled.Text`
`;
