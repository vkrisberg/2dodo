import React, { Component } from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import { connect } from 'react-redux';

import {routeEnum} from '../../enums';
import {AddIcon, ContactsEmptyIcon} from '../../components/icons/';
import {SearchInput} from '../../components/elements';
import TabsContainer from '../tabs-container';
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
      <TabsContainer selected={routeEnum.Contacts} scrolled>
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
        <SearchInput placeholder="Search contacts"/>
        {this.getContacts()}
      </TabsContainer>
    );
  }
}

export default connect()(Contacts);