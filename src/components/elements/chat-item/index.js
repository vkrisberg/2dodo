import React, {Component} from 'react';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native';

import Checkbox from '../checkbox';
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

class ChatItem extends Component {

  state = {
    chosen: false
  }

  onLongPress = () => {
    const {onLongPress} = this.props;

    onLongPress && onLongPress();

    return !this.state.chosen && this.setState({chosen: true});
  }

  render() {
    const {checked, onCheckboxPress, onLongPress} = this.props;

    return (
      <TouchableOpacity onLongPress={this.onLongPress}>
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
              Gomer Simpson
            </ChatName>
            <ChatMessage>
              Send your a video...
            </ChatMessage>
          </ChatBody>
          <ChatInformation>
            <ChatMessageDate>
              21:30
            </ChatMessageDate>
            <ChatNotReadenMessage>
              <ChatNotReadenMessageText>
                12
              </ChatNotReadenMessageText>
            </ChatNotReadenMessage>
          </ChatInformation>
        </Chat>
      </TouchableOpacity>
    );
  }
}

export default connect()(ChatItem);