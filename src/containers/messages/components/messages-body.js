import React, { Component } from 'react';

import {EmptyFavoritsView, BoldText} from './styles';
import {EmptyMessagesIcon} from '../../../components/icons';
import {ChatItem} from '../../../components/elements';

export default class MessagesBody extends Component {
  
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
        <ChatItem
          key={message}
          checked={() => this.isChatChosen(message)}
          onCheckboxPress={() => this.onCheckboxPress(message)}
        />
      ));
    }

    return (
      <EmptyFavoritsView>
        <EmptyMessagesIcon/>
        <BoldText>Your have not chats yet</BoldText>
      </EmptyFavoritsView>
    );
  }
}