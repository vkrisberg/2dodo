import React, {Component} from 'react';
import {TouchableWithoutFeedback, Text} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {contactActions} from '../../store/actions';
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

  static propTypes = {
    contact: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.loadContactList();

    // TODO - remove after tests
    this.createContact({
      username: 'test@api.2do.do',
      nickname: 'test',
      firstName: 'John',
      secondName: 'Smith',
    });
    this.createContact({
      username: 'ramil@api.2do.do',
      nickname: 'ramil',
      firstName: 'Ramil',
      secondName: 'Z.',
    });
    // this.createContact({
    //   username: 'test@api.2do.do',
    //   nickname: 'test',
    // }).then(() => {
    //   this.loadContact('test@api.2do.do').then((contact) => {
    //     contact.firstName = 'John';
    //     contact.secondName = 'Smith';
    //     this.updateContact(contact);
    //   });
    // });
    // this.createContact({
    //   username: 'test2@api.2do.do',
    //   nickname: 'test2',
    // }).then(() => {
    //   this.loadContact('test2@api.2do.do').then((contact) => {
    //     contact.firstName = 'Tony';
    //     contact.secondName = 'Laurence';
    //     this.updateContact(contact).then(() => {
    //       // this.deleteContact('test2@api.2do.do');
    //     });
    //   });
    // });
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

  createContact = (data) => {
    return this.props.dispatch(contactActions.create(data));
  };

  updateContact = (data) => {
    return this.props.dispatch(contactActions.update(data));
  };

  deleteContact = (username) => {
    return this.props.dispatch(contactActions.delete(username));
  };

  getContacts = () => {
    const {contact} = this.props;

    if (!contact.list.length) {
      return (
        <EmptyContactsView>
          <ContactsEmptyIcon/>
          <BoldText>Your have not contacts yet</BoldText>
        </EmptyContactsView>
      );
    }

    return contact.list.map((item, index) => {
      return <Text key={index}>{item.username} {item.firstName} {item.secondName}</Text>;
    });
  };

  onSearchChange = (text) => {
    this.searchContacts(text)
  };

  onCreate = (data) => {
    // TODO: show contact creating form
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
    return (
      <TabsContainer selected={routeEnum.Contacts} scrolled>
        <Header>
          <TitleContainer>
            <StyledTitle>
              Contacts
            </StyledTitle>
          </TitleContainer>
          <AddContact>
            <TouchableWithoutFeedback onPress={this.onCreate}>
              <AddIcon/>
            </TouchableWithoutFeedback>
          </AddContact>
        </Header>
        <SearchInput placeholder="Search contacts" onChange={this.onSearchChange}/>
        {this.getContacts()}
      </TabsContainer>
    );
  }
}

export default connect(state => ({
  contact: state.contact,
}))(Contacts);
