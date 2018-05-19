import React, { Component } from 'react';
import {
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';

import BottomMenu from '../../components/elements/bottom-menu';
import Wrapper from '../../components/layouts/wrapper';
import AddIcon from '../../components/icons/add-icon';
import ContactsEmptyIcon from '../../components/icons/contacts-empty-icon';
import SearchInput from '../../components/elements/search-input';
import {
  StyledTitle,
  Header,
  AddContact,
  TitleContainer,
  EmptyContactsView,
  BoldText
} from './styles';

class Contacts extends Component {

  addContact = () => {

  }

  getContacts = () => {
    return (
      <EmptyContactsView>
        <ContactsEmptyIcon />
        <BoldText>Your have not contacts yet</BoldText>
      </EmptyContactsView>
    );
  }

  render() {
    return (
      <Wrapper>
        <Header>
          <TitleContainer>
            <StyledTitle>
              Contacts
            </StyledTitle>
          </TitleContainer>
          <AddContact>
            <TouchableWithoutFeedback onPress={this.addContact}>
              <AddIcon />
            </TouchableWithoutFeedback>
          </AddContact>
        </Header>
        <SearchInput />
        {this.getContacts()}
        <BottomMenu />
      </Wrapper>
    );
  }
}

export default connect()(Contacts);