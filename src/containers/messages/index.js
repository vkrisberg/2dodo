import React, {Component} from 'react';
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
  SearchText,
  StyledIcon,
  EmptyFavoritsView,
  BoldText
} from './styles';

export default class Favorits extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "Chats",
      title: "messages"
    };
  }

  searchFavorite = () => {
    
  }

  getFavorits = () => {
    const { category, title } = this.state;

    if (category === 'Chats') {
      return (
        <EmptyFavoritsView>
          <EmptyMessagesIcon />
          <BoldText>Your have not chats yet</BoldText>
        </EmptyFavoritsView>
      );
    }

    return null;
  }

  render() {
    return (
      <TabsContainer selected={routeEnum.Messages}>
        <Header>
          <TitleContainer>
            <StyledIcon>
              <FavoritsDotsIcon />
            </StyledIcon>
            <StyledTitle>
              Messages
            </StyledTitle>
          </TitleContainer>
          <AddContact>
            <TouchableWithoutFeedback onPress={this.searchFavorite}>
              <AddIcon />
            </TouchableWithoutFeedback>
          </AddContact>
        </Header>
        <SearchInput placeholder="Search in chats"/>
        {this.getFavorits()}
      </TabsContainer>
    );
  }
}
