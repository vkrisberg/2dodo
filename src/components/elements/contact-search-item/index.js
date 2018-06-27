import React, {PureComponent} from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import PropTypes from 'prop-types';

import {AvatarIcon, TextLabel} from '../index';
import {themeEnum} from '../../../enums';
import {colors, weights} from '../../../styles';
import styles from './styles';

import IMG_ARROW_RIGHT from '../../../images/icons/arrow-right/arrow_right.png';

export default class ContactSearchItem extends PureComponent {

  static propTypes = {
    item: PropTypes.object.isRequired,
    showOnline: PropTypes.bool,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    theme: PropTypes.string,
    context: PropTypes.object,
  };

  static defaultProps = {
    theme: themeEnum.light,
    showOnline: false,
  };

  onPress = () => {
    this.props.onPress && this.props.onPress(this.props.item);
  };

  onLongPress = () => {
    this.props.onLongPress && this.props.onLongPress(this.props.item);
  };

  renderLabel = (_styles) => {
    const {item, showOnline, theme, context} = this.props;
    const inContacts = item.inContacts ? context.t('InContacts') : '';
    let label = `@${item.nickname}`;

    if (showOnline) {
      label = item.isOnline ? context.t('online') : context.t('offline');

      return (
        <TextLabel style={_styles.secondText} size={13} weight={weights.medium} color={colors[theme].grayInput}>
          {label}
        </TextLabel>
      );
    }

    return (
      <TextLabel style={_styles.secondText} size={13} weight={weights.medium} color={colors[theme].grayInput}>
        {label} <TextLabel size={13} weight={weights.medium} color={colors[theme].navbarTitle}>{inContacts}</TextLabel>
      </TextLabel>
    );
  };

  render() {
    const {item, theme} = this.props;
    const _styles = styles(theme);
    const name = item.fullName || item.username;

    return (
      <TouchableOpacity style={_styles.container} onPress={this.onPress} onLongPress={this.onLongPress}>
        <View style={_styles.wrapper}>
          <View style={_styles.image}>
            <AvatarIcon theme={theme} source={item.avatar} label={name}/>
          </View>
          <View style={_styles.body}>
            <TextLabel size={16} weight={weights.semiBold} color={colors[theme].grayBlue}>
              {name}
            </TextLabel>
            {this.renderLabel(_styles)}
          </View>
          <Image source={IMG_ARROW_RIGHT}/>
        </View>
      </TouchableOpacity>
    );
  }
}
