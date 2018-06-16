import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {EmptyContactsView, BoldText} from './styles';
import {ContactsEmptyIcon} from '../../icons';
import {ContactListItem} from '../index';

export default class ContactsBody extends Component {

  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onContactPress: PropTypes.func,
  };

  state = {
    chosenContacts: [],
  };

  componentDidMount() {
    return null;
  }

  onCheckboxPress = (contact) => {
    const {chosenContacts} = this.state;

    if (this.isChatChosen(message)) {
      this.setState({chosenMessage: chosenContacts.filter(item => item !== contact)});
    }

    this.setState({chosenMessage: [...chosenContacts, contact]});
  };

  isContactChosen = (contact) => {
    return this.state.chosenContacts.find(item => item === contact);
  };

  onContactPress(contact) {
    return () => {
      this.props.onContactPress && this.props.onContactPress(contact);
    }
  };

  render() {
    const {contacts} = this.props;

    if (contacts.length) {
      return contacts.map((contact, index) => (
        <ContactListItem
          key={index}
          contact={contact}
          checked={this.isContactChosen(contact)}
          onPress={this.onContactPress(contact)}
          onCheckboxPress={() => this.onCheckboxPress(contact)}
        />
      ));
    }

    return (
      <EmptyContactsView>
        <ContactsEmptyIcon/>
        <BoldText>Your have not contacts yet</BoldText>
      </EmptyContactsView>
    );
  }
}
