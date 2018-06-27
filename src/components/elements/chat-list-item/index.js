import React, {Component} from 'react';
import {TouchableOpacity, View, Image, Text} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import {Checkbox, AvatarIcon} from '../index';
import {themeEnum} from '../../../enums';
import styles from './styles';

export default class ChatListItem extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    theme: PropTypes.string,
    context: PropTypes.object,
    editMode: PropTypes.bool,
    selectedItems: PropTypes.object,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    onCheckboxPress: PropTypes.func,
  };

  static defaultProps = {
    theme: themeEnum.light,
    editMode: false,
    selectedItems: {},
  };

  onPress = () => {
    this.props.onPress && this.props.onPress(this.props.item);
  };

  onLongPress = () => {
    this.props.onLongPress && this.props.onLongPress(this.props.item);
  };

  onCheckboxPress = () => {
    this.props.onCheckboxPress && this.props.onCheckboxPress(this.props.item);
  };

  renderTextMessage = (message, _styles) => {
    return (
      <View>
        {!message.isOwn
        && <Text style={_styles.username} numberOfLines={1} ellipsizeMode="tail">{message.username}</Text>}
        <Text style={_styles.limitText} numberOfLines={2} ellipsizeMode="tail">{message.text}</Text>
      </View>
    );
  };

  renderLastMessage = (_styles) => {
    const {item, context} = this.props;

    if (item.lastMessage) {
      if (item.lastMessage.type === 'text') {
        return this.renderTextMessage(item.lastMessage, _styles);
      }
      return (
        <Text style={_styles.limitText} numberOfLines={2} ellipsizeMode="tail">
          {item.lastMessage.type === 'audio' && context.t('HaveVoiceMessage')}
          {item.lastMessage.type === 'video' && context.t('HaveVideo')}
          {item.lastMessage.type === 'image' && context.t('HaveImage')}
          {item.lastMessage.type === 'call' && context.t('HaveCall')}
        </Text>
      );
    }

    return (
      <Text style={_styles.limitText} numberOfLines={2} ellipsizeMode="tail">
        {context.t('NoMessagesYet')}
      </Text>
    );
  };

  render() {
    const {item, theme, editMode, selectedItems} = this.props;
    const _styles = styles(theme);
    const isToday = moment(item.dateUpdate).format('DD.MM.YY') === moment().format('DD.MM.YY');
    const chosen = selectedItems[item.id];
    const avatarSource = item.contacts && item.contacts.length ? item.contacts[0].avatar : item.avatar;

    return (
      <TouchableOpacity onPress={this.onPress} onLongPress={this.onLongPress}>
        <View style={_styles.container}>
          {editMode && <View style={_styles.checkboxBlock}>
            <Checkbox
              style={_styles.chosen}
              input={{value: !!chosen, onChange: this.onCheckboxPress}}/>
          </View>
          }
          <View style={_styles.image}>
            <AvatarIcon theme={theme} source={avatarSource} label={item.shortName}/>
          </View>
          <View style={_styles.body}>
            <Text style={_styles.name}>
              {item.name}
            </Text>
            {this.renderLastMessage(_styles)}
          </View>
          <View style={_styles.information}>
            <Text style={_styles.text}>
              {isToday && moment(item.dateUpdate).format('HH:mm')}
              {!isToday && moment(item.dateUpdate).format('DD.MM.YY')}
            </Text>
            {item.unreadCount > 0 &&
            <View style={_styles.notReadenMessage}>
              <Text style={_styles.notReadenMessageText}>
                {item.unreadCount}
              </Text>
            </View>
            }
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
