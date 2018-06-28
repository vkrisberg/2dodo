import React, {PureComponent} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import {TextLabel} from '../index';
import {themeEnum} from '../../../enums';
import {colors, weights, fontStyle} from '../../../styles';
import styles from './styles';

import IMG_BUBBLE_LEFT from './img/bubble_left.png';
import IMG_BUBBLE_RIGHT from './img/bubble_right.png';
import IMG_STAR from './img/star.png';
import IMG_STATUS_SEND from './img/status_send.png';
import IMG_STATUS_READ from './img/status_read.png';

const DATE_FORMAT = 'HH:mm';

export default class MessageListItem extends PureComponent {

  static propTypes = {
    item: PropTypes.object.isRequired,
    theme: PropTypes.string,
    context: PropTypes.object,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
  };

  static defaultProps = {
    theme: themeEnum.light,
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
    const {item, theme, context} = this.props;
    const _styles = styles({theme});
    const containerStyle = item.isOwn ? _styles.containerRight : _styles.containerLeft;
    const textColor = item.isOwn ? colors[theme].white : colors[theme].messageTextMain;
    const dateColor = colors[theme].messageTextSecond;
    const bubbleImg = item.isOwn ? IMG_BUBBLE_RIGHT : IMG_BUBBLE_LEFT;

    return (
      <TouchableOpacity style={containerStyle} onPress={this.onPress(item)} onLongPress={this.onLongPress}>
        <Image
          style={_styles.background}
          capInsets={{top: 10, left: 15, bottom: 10, right: 15}}
          resizeMode="stretch"
          source={bubbleImg}/>
        <View style={_styles.wrapper}>
          <View style={_styles.textWrapper}>
            <TextLabel color={textColor}
                       size={15}
                       weight={weights.medium}>{item.text}</TextLabel>
          </View>
          <View style={_styles.dateWrapper}>
            {item.status && (item.status === 'sending' || item.status === 'sent') &&
            <Image source={IMG_STATUS_SEND} style={_styles.statusIcon}/>}
            {item.status && item.status === 'received' &&
            <Image source={IMG_STATUS_SEND} tintColor={colors[theme].blueStatus} style={_styles.statusIcon}/>}
            {item.status && item.status === 'read' && <Image source={IMG_STATUS_READ} style={_styles.statusIcon}/>}
            <TextLabel color={dateColor}
                       size={11}
                       fontStyle={fontStyle.italic}
                       weight={weights.medium}>{moment(item.dateCreate).format(DATE_FORMAT)}</TextLabel>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
