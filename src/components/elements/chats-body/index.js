import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {EmptyFavoritsView, BoldText} from './styles';
import {EmptyMessagesIcon} from '../../../components/icons';
import {ChatItem} from '../../../components/elements';

export default class ChatsBody extends Component {

  static propTypes = {
    chatList: PropTypes.array.isRequired,
    onChatPress: PropTypes.func,
  };

  state = {
    chosenMessages: [],
  };

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

  onChatPress(chat) {
    return () => {
      this.props.onChatPress && this.props.onChatPress(chat);
    };
  }

  render() {
    const {chatList} = this.props;

    if (chatList.length) {
      return chatList.map((chat, index) => (
        <ChatItem
          key={index}
          chat={chat}
          checked={this.isChatChosen(chat)}
          onPress={this.onChatPress(chat)}
          onCheckboxPress={() => this.onCheckboxPress(chat)}
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
