import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import Wrapper from '../../../components/layouts/wrapper';
import {ArrowIcon} from '../../../components/icons';
import {SearchInput, ContactsBody} from '../../../components/elements';
import {AddContact as AddContactForm} from '../../../components/forms';
import {contactActions} from '../../../store/actions';
import {Header, TitleContainer, StyledTitle} from '../styles';

class CreateChat extends Component {

  componentDidMount() {
    this.loadContactList();
  }

  loadContactList = (filter, sort, descending) => {
    return this.props.dispatch(contactActions.loadList(filter, sort, descending));
  };

  searchContacts = (text) => {
    const filter = `username CONTAINS[c] '${text}' OR firstName CONTAINS[c] '${text}' OR secondName CONTAINS[c] '${text}'`;
    return this.loadContactList(filter);
  };

  goBack = () => this.props.navigation.goBack();

  onSearchChange = (text) => {
    this.searchContacts(text);
  };

  addContact = (data) => {
    if (!data.username) {
      this.goBack();
      return;
    }

    data.username = data.username.toLowerCase();
    data.nickname = data.username.split('@')[0];

    this.props.dispatch(contactActions.create(data)).then(() => {
      this.goBack();
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
        <ContactsBody contacts={contact.list}/>
      </Wrapper>
    );
  }
}

export default connect(state => ({
  contact: state.contact,
}))(CreateChat);
