import React, {Component} from 'react';
import {TouchableWithoutFeedback} from 'react-native';

import TabsContainer from '../tabs-container';
import {routeEnum} from '../../enums';
import {FavoritsDotsIcon, EmptyFavoritsIcon} from '../../components/icons';
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
          <EmptyFavoritsIcon />
          <BoldText>No {title.toLowerCase()} in favorits</BoldText>
        </EmptyFavoritsView>
      );
    }

    return null;
  }

  render() {
    return (
      <TabsContainer selected={routeEnum.Favorits}>
        <Header>
          <TitleContainer>
            <StyledIcon>
              <FavoritsDotsIcon />
            </StyledIcon>
            <StyledTitle>
              Favorits
            </StyledTitle>
          </TitleContainer>
          <AddContact>
            <TouchableWithoutFeedback onPress={this.searchFavorite}>
              <SearchText>Search</SearchText>
            </TouchableWithoutFeedback>
          </AddContact>
        </Header>
        {this.getFavorits()}
      </TabsContainer>
    );
  }
}
