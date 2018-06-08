import React, {Component} from 'react';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import Checkbox from '../checkbox-svg';
import {AvatarIcon} from '../../icons';
import {
  Chat,
  ChatChosen,
  ChatImage,
  ChatBody,
  ChatName,
  ChatMessage,
  ChatMessageDate,
  ChatNotReadenMessage,
  ChatNotReadenMessageText,
  ChatInformation
} from './styles';

export default class ChatItem extends Component {

  static propTypes = {
    chat: PropTypes.object.isRequired,
    checked: PropTypes.bool,
    onCheckboxPress: PropTypes.func,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
  };

  state = {
    chosen: false,
  };

  onLongPress = () => {
    const {onLongPress} = this.props;

    onLongPress && onLongPress();

    return !this.state.chosen && this.setState({chosen: true});
  };

  render() {
    const {chat, checked, onCheckboxPress, onPress} = this.props;

    return (
      <TouchableOpacity onPress={onPress} onLongPress={this.onLongPress}>
        <Chat>
          { this.state.chosen && <Checkbox
            checked={checked}
            style={ChatChosen}
            onPress={onCheckboxPress}
          />
          }
          <ChatImage>
            <AvatarIcon/>
          </ChatImage>
          <ChatBody>
            <ChatName>
              {chat.name}
            </ChatName>
            <ChatMessage>
              You have a message...
            </ChatMessage>
          </ChatBody>
          <ChatInformation>
            <ChatMessageDate>
              {moment().format('HH:mm')}
            </ChatMessageDate>
            <ChatNotReadenMessage>
              <ChatNotReadenMessageText>
                {chat.unreadCount}
              </ChatNotReadenMessageText>
            </ChatNotReadenMessage>
          </ChatInformation>
        </Chat>
      </TouchableOpacity>
    );
  }
}
