import React, {PureComponent} from 'react';
import {TouchableWithoutFeedback} from 'react-native';

import TabsContainer from '../tabs-container';
import {routeEnum} from '../../enums';
import {FavoritsDotsIcon, EmptyMessagesIcon, AddIcon} from '../../components/icons';
import {SearchInput} from '../../components/elements';
import {
  Header,
  StyledTitle,
  TitleContainer,
  AddContact,
  StyledIcon,
  EmptyFavoritsView,
  BoldText
} from './styles';

export default class Messages extends PureComponent {
  componentDidMount() {

  }

  loadChatList = () => {

  };

  loadChatMessages = () => {

  };

  createChat = async (members) => {
    for (let i = 0; i < members.length; i++) {

    }
  };

  sendChatMessage = () => {

  };

  searchFavorite = () => {
  };

  getFavorits = () => {
    return (
      <EmptyFavoritsView>
        <EmptyMessagesIcon/>
        <BoldText>Your have not chats yet</BoldText>
      </EmptyFavoritsView>
    );
  };

  render() {
    return (
      <TabsContainer selected={routeEnum.Messages}>
        <Header>
          <TitleContainer>
            <StyledIcon>
              <FavoritsDotsIcon/>
            </StyledIcon>
            <StyledTitle>
              Messages
            </StyledTitle>
          </TitleContainer>
          <AddContact>
            <TouchableWithoutFeedback onPress={this.searchFavorite}>
              <AddIcon/>
            </TouchableWithoutFeedback>
          </AddContact>
        </Header>
        <SearchInput placeholder="Search in chats"/>
        {this.getFavorits()}
      </TabsContainer>
    );
  }
}
