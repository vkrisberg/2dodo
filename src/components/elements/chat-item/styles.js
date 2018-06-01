import styled from 'styled-components';

export const Chat = styled.View`
  width: 92%;
  height: 56px;
  margin-vertical: 8px;
  margin-horizontal: auto;
  align-items: center;
  flex-direction: row;
`;

export const ChatChosen = {
  marginBottom: -6
};

export const ChatImage = styled.View`
  width: 56px;
  height: 56px;
  background-color: #e4e4e4;
  border-radius: 50;
  margin-left: 8px;
  align-items: center;
  justify-content: center;
`;

export const ChatInformation = styled.View`
  height: 56px;
  margin-left: 16px;
`;

export const ChatBody = ChatInformation.extend`
  width: 195;
`;

export const ChatName = styled.Text`
  font-weight: bold;
  align-self: flex-start;
  font-size: 16px;
`;

export const ChatMessage = styled.Text`
`;

export const ChatMessageDate = styled.Text`
  font-size: 15px;
`;

export const ChatNotReadenMessage = styled.View`
  align-items: center;
  justify-content: center;
  background-color: #5395f3;
  border-radius: 50;
  width: 36px;
  margin-top: 8px;
`;

export const ChatNotReadenMessageText = styled.Text`
  color: white;
`;