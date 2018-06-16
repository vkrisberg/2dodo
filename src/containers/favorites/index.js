import React, {Component} from 'react';
import {TouchableWithoutFeedback} from 'react-native';

import {Wrapper} from '../../components/layouts';
import {FavoritsDotsIcon, EmptyFavoritsIcon} from '../../components/icons';
import {FavoritsNav} from '../../components/elements';
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

export default class Favorites extends Component {
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
          <BoldText>No {title.toLowerCase()} in favorites</BoldText>
        </EmptyFavoritsView>
      );
    }

    return null;
  }

  render() {
    return (
      <Wrapper scrolled>
        <Header>
          <TitleContainer>
            <StyledIcon>
              <FavoritsDotsIcon />
            </StyledIcon>
            <StyledTitle>
              Favorites
            </StyledTitle>
          </TitleContainer>
          <AddContact>
            <TouchableWithoutFeedback onPress={this.searchFavorite}>
              <SearchText>Search</SearchText>
            </TouchableWithoutFeedback>
          </AddContact>
        </Header>
        <FavoritsNav />
        {this.getFavorits()}
      </Wrapper>
    );
  }
}
