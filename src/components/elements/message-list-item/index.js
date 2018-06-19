import React, {PureComponent} from 'react';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import {TextLabel} from '../index';
import {themeEnum} from '../../../enums';
import {colors, weights} from '../../../styles';
import styles from './styles';

import IMG_STAR from './img/star.png';
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
    const dateColor = item.isOwn ? colors[theme].white : colors[theme].messageTextSecond;

    return (
      <TouchableOpacity style={containerStyle} onPress={this.onPress(item)} onLongPress={this.onLongPress}>
        <View style={_styles.textWrapper}>
          <TextLabel color={textColor}
                     size={15}
                     weight={weights.medium}>{item.text}</TextLabel>
        </View>
        <View style={_styles.dateWrapper}>
          <TextLabel color={dateColor}
                     size={11}
                     weight={weights.medium}>{moment(item.dateCreate).format(DATE_FORMAT)}</TextLabel>
        </View>
      </TouchableOpacity>
    );
  }
}
