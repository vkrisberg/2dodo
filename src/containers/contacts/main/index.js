import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {contactActions} from '../../../store/actions';
import {AddIcon} from '../../../components/icons/';
import {SearchInput, ContactsBody} from '../../../components/elements';
import {Wrapper} from '../../../components/layouts';
import {AddContact} from './styles';
import {Header, StyledTitle, TitleContainer} from '../styles';

class Contacts extends Component {

  static propTypes = {
    contact: PropTypes.object,
  };

  componentDidMount() {
    this.loadContactList();
  }

  loadContact = (username) => {
    return this.props.dispatch(contactActions.loadOne(username));
  };

  loadContactList = (filter, sort, descending) => {
    return this.props.dispatch(contactActions.loadList(filter, sort, descending));
  };

  searchContacts = (text) => {
    const filter = `username CONTAINS[c] '${text}' OR firstName CONTAINS[c] '${text}' OR secondName CONTAINS[c] '${text}'`;
    return this.loadContactList(filter);
  };

  updateContact = (data) => {
    return this.props.dispatch(contactActions.update(data));
  };

  deleteContact = (username) => {
    return this.props.dispatch(contactActions.delete(username));
  };

  onSearchChange = (text) => {
    this.searchContacts(text);
  };

  onCreate = (data) => {
    this.props.navigation.navigate('AddContact');
    // this.createContact(data);
  };

  onUpdate = (username) => {
    this.loadContact(username).then(() => {
      // TODO: show contact updating form
    });
  };

  onDelete = (username) => {
    // TODO: show contact deleting confirmation form
    // this.deleteContact(username);
  };

  render() {
    const {contact} = this.props;

    return (
      <Wrapper scrolled>
        <Header>
          <TitleContainer>
            <StyledTitle>
              Contacts
            </StyledTitle>
          </TitleContainer>
          <AddContact>
            <TouchableOpacity onPress={this.onCreate}>
              <AddIcon/>
            </TouchableOpacity>
          </AddContact>
        </Header>
        <SearchInput placeholder="Search contacts" onChange={this.onSearchChange}/>
        <ContactsBody contacts={contact.list}/>
      </Wrapper>
    );
  }
}

export default connect(state => ({
  contact: state.contact,
}))(Contacts);
