import React, {PureComponent} from 'react';
import {TouchableOpacity, Text, Image} from 'react-native';
import PropTypes from 'prop-types';

import AvatarIcon from '../../icons/avatar-icon';
import {themeEnum} from '../../../enums';
import styles from './styles';
import {validation} from '../../../utils';

export default class Avatar extends PureComponent {

  static propTypes = {
    source: PropTypes.any,
    theme: PropTypes.string,
    color: PropTypes.string,
    bgColor: PropTypes.string,
    disabled: PropTypes.bool,
    textStyle: PropTypes.any,
    style: PropTypes.any,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    theme: themeEnum.light,
  };

  onPress = () => {
    const {onPress} = this.props;
    onPress && onPress();
  };

  renderAvatar(_styles) {
    const {source, textStyle} = this.props;

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

    if (typeof this.props.children === 'string') {
      return (
        <Text style={[_styles.text, textStyle]}>{this.props.children}</Text>
      );
    }

    return <AvatarIcon/>;
  }

  render() {
    const {theme, color, bgColor, disabled, style} = this.props;
    const _styles = styles({theme, color, bgColor});

    return (
      <TouchableOpacity style={[_styles.container, style]}
                        disabled={disabled}
                        onPress={this.onPress}>
        {this.renderAvatar(_styles)}
      </TouchableOpacity>
    );
  }
}
