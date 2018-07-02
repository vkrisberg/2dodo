import React, {PureComponent} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import {TextLabel} from '../../../components/elements';
import {themeEnum} from '../../../enums';
import {colors, weights} from '../../../styles';
import styles from './styles';

export default class MessageTyping extends PureComponent {

  static propTypes = {
    typing: PropTypes.object,
    showTyping: PropTypes.bool,
    theme: PropTypes.string,
    context: PropTypes.object,
    style: PropTypes.any,
  };

  static defaultProps = {
    typing: {name: ''},
    showTyping: false,
    theme: themeEnum.light,
  };

  renderTyping = (_styles) => {
    const {typing, theme, context} = this.props;
    const typingText = `${typing.name || ''} ${context.t('typing')}...`;

    if (!this.props.showTyping) {
      return null;
    }

    return (
      <View style={_styles.typingContainer}>
        <View style={_styles.circle}/>
        <View style={_styles.circle}/>
        <View style={[_styles.circle, {marginBottom: 2}]}/>
        <TextLabel style={_styles.text}
                   size={14}
                   color={colors[theme].messageTextSecond}
                   weight={weights.medium}>{typingText}</TextLabel>
      </View>
    );
  };

  render() {
    const {theme, style} = this.props;
    const _styles = styles(theme);

    return (
      <View style={[_styles.container, style]}>
        {this.renderTyping(_styles)}
      </View>
    );
  }
}
