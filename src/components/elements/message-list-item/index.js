import React, {PureComponent} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import {TextLabel, Quote} from '../index';
import {themeEnum} from '../../../enums';
import {colors, weights, fontStyle} from '../../../styles';
import styles from './styles';

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

  renderQuote = (quote, isOwn) => {
    const {theme} = this.props;
    const style = {backgroundColor: isOwn ? colors[theme].white : colors[theme].grayLight};

    return (
      <Quote data={quote} theme={theme} style={style}/>
    );
  };

  render() {
    const {item, theme, context} = this.props;
    const _styles = styles({theme});
    const containerStyle = item.isOwn ? _styles.containerRight : _styles.containerLeft;
    const textColor = item.isOwn ? colors[theme].white : colors[theme].messageTextMain;
    const dateColor = colors[theme].messageTextSecond;

    return (
      <TouchableOpacity style={containerStyle} onPress={this.onPress(item)} onLongPress={this.onLongPress}>
        {item.quote && this.renderQuote(item.quote, item.isOwn)}
        <View style={_styles.textWrapper}>
          <TextLabel color={textColor}
                     size={15}
                     weight={weights.medium}>{item.text}</TextLabel>
        </View>
        <View style={_styles.dateWrapper}>
          {item.status && item.isOwn && (item.status === 'sending' || item.status === 'sent') && <Image source={IMG_STATUS_SEND} style={_styles.statusIcon}/>}
          {item.status && item.isOwn && item.status === 'received' && <Image source={IMG_STATUS_SEND} tintColor={colors[theme].blueStatus} style={_styles.statusIcon}/>}
          {item.status && item.isOwn && item.status === 'read' && <Image source={IMG_STATUS_READ} style={_styles.statusIcon}/>}
          <TextLabel color={dateColor}
                     size={11}
                     fontStyle={fontStyle.italic}
                     weight={weights.medium}>{moment(item.dateCreate).format(DATE_FORMAT)}</TextLabel>
        </View>
      </TouchableOpacity>
    );
  }
}
