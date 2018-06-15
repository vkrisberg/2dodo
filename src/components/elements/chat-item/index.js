import React, {Component} from 'react';
import {TouchableOpacity, View, Image, Text} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import Checkbox from '../checkbox-svg';
import {AvatarIcon} from '../../icons';
import styles, {ChatChosen} from './styles';
import {themeEnum} from '../../../enums';

export default class ChatItem extends Component {

  static propTypes = {
    theme: PropTypes.string,
    context: PropTypes.object,
    chat: PropTypes.object.isRequired,
    checked: PropTypes.bool,
    onCheckboxPress: PropTypes.func,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
  };

  static defaultProps = {
    theme: themeEnum.light,
  };

  state = {
    chosen: false,
  };

  onLongPress = () => {
    const {onLongPress} = this.props;

    onLongPress && onLongPress();

    return !this.state.chosen && this.setState({chosen: true});
  };

  getInitials = (name) => {
    const nameArr = name.split(' ');
    let initials = [];
    nameArr.map( item =>
      initials.push(item[0].toUpperCase())
    );
    return initials.join('');
  };

  render() {
    const {theme, chat, checked, onCheckboxPress, onPress, context} = this.props;
    const _styles = styles(theme);
    const isToday = moment(chat.dateUpdate).format('DD.MM.YY') === moment().format('DD.MM.YY');

    return (
      <TouchableOpacity onPress={onPress} onLongPress={this.onLongPress}>
        <View style={_styles.container}>
          { this.state.chosen && <Checkbox
            checked={checked}
            style={ChatChosen}
            onPress={onCheckboxPress}
          />
          }
          <View style={_styles.image}>
            {chat.avatar.length > 0 && <Image source={{uri: chat.avatar}} style={_styles.avatar}/>}
            {!chat.avatar.length && chat.name && <Text style={_styles.avatarInitials}>{this.getInitials(chat.name)}</Text>}
            {!chat.name && !chat.avatar.length && <AvatarIcon/>}
          </View>
          <View style={_styles.body}>
            <Text style={_styles.name}>
              {chat.name}
            </Text>
            <Text style={_styles.limitText} numberOfLines={1} ellipsizeMode="tail">
              {chat.unreadCount > 0 && chat.lastMessage.type === 'text' && context.t('HaveMessage')}
              {chat.unreadCount > 0 && chat.lastMessage.type === 'audio' && context.t('HaveVoiceMessage')}
              {chat.unreadCount > 0 && chat.lastMessage.type === 'video' && context.t('HaveVideo')}
              {chat.unreadCount > 0 && chat.lastMessage.type === 'image' && context.t('HaveImage')}
              {chat.unreadCount > 0 && chat.lastMessage.type === 'call' && context.t('HaveCall')}
              {chat.unreadCount === 0 && chat.lastMessage.text}
            </Text>
          </View>
          <View style={_styles.information}>
            <Text style={_styles.text}>
              {isToday && moment(chat.dateUpdate).format('HH:mm')}
              {!isToday && moment(chat.dateUpdate).format('DD.MM.YY')}
            </Text>
            {chat.unreadCount > 0 &&
              <View style={_styles.notReadenMessage}>
                <Text style={_styles.notReadenMessageText}>
                  {chat.unreadCount}
                </Text>
              </View>
            }
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
