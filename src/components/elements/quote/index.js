import React, {PureComponent} from 'react';
import {Image, View} from 'react-native';
import PropTypes from 'prop-types';

import {TextLabel} from '../../../components/elements';
import {themeEnum} from '../../../enums';
import {colors, weights} from '../../../styles';
import styles from './styles';

import IMG_QUOTE from './img/quote.png';

export default class Quote extends PureComponent {

  static propTypes = {
    data: PropTypes.object.isRequired,
    theme: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    theme: themeEnum.light,
  };

  render() {
    const {theme, style} = this.props;
    const data = JSON.parse(this.props.data);
    const _styles = styles(theme);

    return (
      <View style={[_styles.quoteContainer, style]}>
        <Image source={IMG_QUOTE}/>
        <View style={_styles.quoteBlock}>
          <TextLabel size={15} weight={weights.semiBold} color={colors[theme].messageTextMain} style={_styles.name}>{data.name}</TextLabel>
          <TextLabel size={15} weight={weights.medium} color={colors[theme].messageTextMain}>{data.text}</TextLabel>
        </View>
      </View>
    );
  }
}
