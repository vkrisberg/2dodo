import React, {PureComponent} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';

import {themeEnum} from '../../../enums';
import {colors} from '../../../styles';
import styles from './styles';

export default class Button extends PureComponent {

  static propTypes = {
    theme: PropTypes.string,
    color: PropTypes.string,
    bgColor: PropTypes.string,
    borderColor: PropTypes.string,
    opacity: PropTypes.number,
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

  renderText(_styles) {
    const {textStyle} = this.props;

    if (typeof this.props.children === 'string') {
      return (
        <Text style={[_styles.text, textStyle]}>{this.props.children}</Text>
      );
    }

    return this.props.children;
  }

  render() {
    let {theme, color, bgColor, disabled, borderColor, style, opacity} = this.props;
    if (disabled) {
      color = colors[theme].disableButtonText;
      borderColor = colors[theme].disableButtonText;
      bgColor = colors[theme].disableButtonBg;
      opacity = 0.5;
    }
    const _styles = styles({theme, color, bgColor, borderColor, opacity});

    return (
      <TouchableOpacity style={[_styles.container, style]}
                        disabled={disabled}
                        onPress={this.onPress}>
        {this.renderText(_styles)}
      </TouchableOpacity>
    );
  }
}
