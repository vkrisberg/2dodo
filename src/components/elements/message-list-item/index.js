import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  Message,
  MessageBody,
  MessageName,
  MessageText,
  MessageDate,
} from './styles';

const DATE_FORMAT = 'DD MMM YYYY HH:mm:ss.SSS';

export default class MessageListItem extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
  };

  onPress(item) {
    return () => {
      this.props.onPress && this.props.onPress(item);
    };
  }

  onLongPress(item) {
    return () => {
      this.props.onLongPress && this.props.onLongPress(item);
    };
  }

  render() {
    const {item} = this.props;

    return (
      <TouchableOpacity onPress={this.onPress(item)} onLongPress={this.onLongPress}>
        <Message>
          <MessageBody>
            <MessageText>{item.text}</MessageText>
            <MessageName>{item.username}</MessageName>
            <MessageDate>{moment(item.dateCreate).format(DATE_FORMAT)}</MessageDate>
          </MessageBody>
        </Message>
      </TouchableOpacity>
    );
  }
}
