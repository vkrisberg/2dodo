import styled from 'styled-components';

export const Message = styled.View`
  width: 100%;
  height: auto;
  margin-vertical: 8px;
  margin-horizontal: auto;
  align-items: center;
  flex-direction: row;
`;

export const MessageBody = styled.View`
  width: 195;
`;

export const MessageName = styled.Text`
  font-weight: bold;
  align-self: flex-start;
  font-size: 12;
`;

export const MessageText = styled.Text`
  font-size: 16;
`;

export const MessageDate = styled.Text`
  font-size: 10;
`;
