import React, {PureComponent} from 'react';
import {View, Image} from 'react-native';
import PropTypes from 'prop-types';

import {TextLabel} from '../index';
import {themeEnum} from '../../../enums';
import {colors, weights} from '../../../styles';
import styles from './styles';

import IMG_CIRCLE from '../../../images/icons/circle/circle.png';

export default class AvatarIcon extends PureComponent {

  static propTypes = {
    source: PropTypes.any,
    label: PropTypes.string,
    theme: PropTypes.string,
    style: PropTypes.any,
  };

  static defaultProps = {
    theme: themeEnum.light,
    label: '',
  };

  renderAvatar(_styles) {
    const {theme, source, label} = this.props;
    const labelArr = label.split(' ');
    const text = labelArr.length > 1
      ? `${labelArr[0][0].toUpperCase()}${labelArr[1][0].toUpperCase()}`
      : `${label[0].toUpperCase()}${label[1].toUpperCase()}`;

    if (source && typeof source === 'object') {
      return (
        <Image style={_styles.avatar} source={source}/>
      );
    }

    if (source && typeof source === 'string') {
      return (
        <Image style={_styles.avatar} source={{uri: `data:image/jpeg;base64,${source}`}}/>
      );
    }

    return (
      <View style={_styles.labelContainer}>
        <Image style={_styles.avatarBg} source={IMG_CIRCLE}/>
        <TextLabel color={colors[theme].white} size={16} weight={weights.semiBold}>{text}</TextLabel>
      </View>
    );
  }

  render() {
    const {theme, style} = this.props;
    const _styles = styles({theme});

    return (
      <View style={[_styles.container, style]}>
        {this.renderAvatar(_styles)}
      </View>
    );
  }
}
