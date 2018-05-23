import React, {Component} from 'react';
import {TouchableWithoutFeedback, Text} from 'react-native';
import {connect} from 'react-redux';

import contactApi from '../../api/contact';
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

  componentDidMount() {
    this.loadContacts();
    // this.createContact({
    //   username: 'test@api.2do.do',
    //   nickname: 'test',
    // });
    // this.createContact({
    //   username: 'test2@api.2do.do',
    //   nickname: 'test2',
    // });
  }

  loadContacts = (filter, sort, descending) => {
    this.props.dispatch(contactActions.load(filter, sort, descending));
  };

  createContact = (data) => {
    this.props.dispatch(contactActions.create(data));
  };

  updateContact = (data) => {
    this.props.dispatch(contactActions.update(data));
  };

  deleteContact = (username) => {
    this.props.dispatch(contactActions.delete(username));
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

    return contact.list.map((item) => {
      return <Text>{item.username}</Text>;
    });
  };

  onCreate = (data) => {
    // TODO: show contact creating form
  };

  onUpdate = (data) => {
    // TODO: show contact updating form
  };

  onDelete = (data) => {
    // TODO: show contact deleting confirmation form
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
        <SearchInput placeholder="Search contacts"/>
        {this.getContacts()}
      </TabsContainer>
    );
  }
}

export default connect(state => ({
  contact: state.contact,
}))(Contacts);
