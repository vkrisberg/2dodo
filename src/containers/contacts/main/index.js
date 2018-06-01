import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {contactActions} from '../../../store/actions';
import {AddIcon, FavoritsDotsIcon} from '../../../components/icons/';
import {SearchInput, ContactsBody} from '../../../components/elements';
import {Wrapper} from '../../../components/layouts';
import {Header, StyledTitle, TitleContainer, StyledIcon, AddButton} from '../styles';

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
          <TitleContainer width={'60%'}>
            <StyledIcon>
              <FavoritsDotsIcon/>
            </StyledIcon>
            <StyledTitle marginLeft={30}>
              Contacts
            </StyledTitle>
          </TitleContainer>
          <AddButton>
            <TouchableOpacity onPress={this.onCreate}>
              <AddIcon/>
            </TouchableOpacity>
          </AddButton>
        </Header>
        <SearchInput placeholder="Search in contacts" onChange={this.onSearchChange}/>
        <ContactsBody contacts={contact.list}/>
      </Wrapper>
    );
  }
}

export default connect(state => ({
  contact: state.contact,
}))(Contacts);
