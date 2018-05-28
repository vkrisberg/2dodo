import React, { Component } from 'react';

import {EmptyContactsView, BoldText} from '../styles';
import {ContactsEmptyIcon} from '../../../../components/icons';
import {ContactItem} from '../../../../components/elements';
import { connect } from 'react-redux';

class ContactsBody extends Component {
  
  state = {
    messages: [1, 2, 3, 4, 5, 6],
    chosenMessages: []
  };

  componentDidMount() {
    return null;
  }

  onCheckboxPress = (message) => {
    const {chosenMessages} = this.state;

    if (this.isChatChosen(message)) {
      this.setState({chosenMessage: chosenMessages.filter(item => item !== message)});
    }

    this.setState({chosenMessage: [...chosenMessages, message]});
  }

  isChatChosen = (message) => {
    return this.state.chosenMessages.find(item => item === message);
  }

  render() {
    const {messages} = this.state;

    if (messages.length) {
      return messages.map (message => (
        <ContactItem
          key={message}
          checked={() => this.isChatChosen(message)}
          onCheckboxPress={() => this.onCheckboxPress(message)}
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

export default connect()(ContactsBody);
