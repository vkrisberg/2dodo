import React, {PureComponent} from 'react';
import {Image, View} from 'react-native';
import PropTypes from 'prop-types';

import {TextLabel} from '../../../components/elements';
import {themeEnum} from '../../../enums';
import {colors, weights} from '../../../styles';
import {helpers} from '../../../utils';
import styles from './styles';

import IMG_QUOTE from './img/quote.png';

export default class MessageQuote extends PureComponent {

  static propTypes = {
    message: PropTypes.object.isRequired,
    theme: PropTypes.string,
    style: PropTypes.any,
  };

  static defaultProps = {
    theme: themeEnum.light,
  };

  render() {
    const {message, theme, style} = this.props;
    const _styles = styles(theme);
    const nickname = helpers.getNickname(message.username);

    return (
      <View style={[_styles.quoteContainer, style]}>
        <Image source={IMG_QUOTE}/>
        <View style={_styles.quoteBlock}>
          <TextLabel size={15} weight={weights.semiBold} color={colors[theme].messageTextMain} style={_styles.name}>{nickname}</TextLabel>
          <TextLabel size={15} weight={weights.medium} color={colors[theme].messageTextMain}>{message.text}</TextLabel>
        </View>
      </View>
    );
  }
}
