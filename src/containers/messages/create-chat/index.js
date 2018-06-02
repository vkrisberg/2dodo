import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import Wrapper from '../../../components/layouts/wrapper';
import {ArrowIcon} from '../../../components/icons';
import {SearchInput, ContactsBody} from '../../../components/elements';
import {chatActions, contactActions} from '../../../store/actions';
import {Header, TitleContainer, StyledTitle} from '../styles';
import {routeEnum} from '../../../enums';

class CreateChat extends Component {

  componentDidMount() {
    this.loadContactList();
  }

  loadContactList = (filter, sort, descending) => {
    return this.props.dispatch(
      contactActions.loadList(filter, sort, descending)
    );
  };

  searchContacts = (text) => {
    const filter = `username CONTAINS[c] '${text}' OR firstName CONTAINS[c] '${text}' OR secondName CONTAINS[c] '${text}'`;
    return this.loadContactList(filter);
  };

  createChat = (contacts) => {
    return this.props.dispatch(
      chatActions.create(contacts)
    );
  };

  goBack = () => this.props.navigation.goBack();

  onSearchChange = (text) => {
    this.searchContacts(text);
  };

  onCreateChat = (contact) => {
    this.createChat([contact]).then((chat) => {
      this.goBack();
      // this.props.navigation.navigate(routeEnum.PrivateChat, {chat});
    });
  };

  render() {
    const {contact} = this.props;

    return (
      <Wrapper scrolled>
        <Header>
          <TitleContainer width="100%">
            <TouchableOpacity onPress={this.goBack}>
              <ArrowIcon />
            </TouchableOpacity>
            <StyledTitle marginLeft={20}>
              Create chat with
            </StyledTitle>
          </TitleContainer>
        </Header>
        <SearchInput placeholder="Search in contacts" onChange={this.onSearchChange}/>
        <ContactsBody contacts={contact.list} onContactPress={this.onCreateChat}/>
      </Wrapper>
    );
  }
}

export default connect(state => ({
  contact: state.contact,
}))(CreateChat);
