import React, {PureComponent} from 'react';
import {View, Image} from 'react-native';
import PropTypes from 'prop-types';

import {TextLabel} from '../index';
import {themeEnum} from '../../../enums';
import {colors, weights} from '../../../styles';
import {validation} from '../../../utils';
import styles from './styles';

import IMG_CIRCLE from '../../../images/icons/circle/circle.png';

const DEFAULT_WH = 50;
const DEFAULT_FONT_SIZE = 16;

export default class AvatarIcon extends PureComponent {

  static propTypes = {
    source: PropTypes.any,
    label: PropTypes.string,
    theme: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    style: PropTypes.any,
  };

  static defaultProps = {
    theme: themeEnum.light,
    label: '',
    width: DEFAULT_WH,
    height: DEFAULT_WH,
  };

  renderAvatar(_styles) {
    const {theme, source, width} = this.props;
    const fontSize = (width / DEFAULT_WH) * DEFAULT_FONT_SIZE;
    const label = this.props.label.replace(/[^\w\s]+/, ''); // remove spec symbols like '@'
    const labelArr = label.toUpperCase().split(' ');
    const text = labelArr.length > 1
      ? `${labelArr[0].substr(0,1)}${labelArr[1].substr(0,1)}`
      : `${(label[0] || '').toUpperCase()}${(label[1] || '').toUpperCase()}`;

    if (source && typeof source === 'object') {
      return (
        <Image style={_styles.avatar} source={source}/>
      );
    }

    if (source && typeof source === 'string') {
      const prefix = !validation.httpPrefixRegex.test(source) && !validation.base64PrefixRegex.test(source)
        ? 'data:image/jpeg;base64,'
        : '';
      return (
        <Image style={_styles.avatar} source={{uri: prefix + source}}/>
      );
    }

    return (
      <View style={_styles.labelContainer}>
        <Image style={_styles.avatarBg} source={IMG_CIRCLE}/>
        <TextLabel color={colors[theme].white} size={fontSize} weight={weights.semiBold}>{text}</TextLabel>
      </View>
    );
  }

  render() {
    const {theme, style, width, height} = this.props;
    const _styles = styles({theme, width, height});

    return (
      <View style={[_styles.container, style]}>
        {this.renderAvatar(_styles)}
      </View>
    );
  }
}
