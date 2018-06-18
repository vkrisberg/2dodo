import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';

import {themeEnum} from '../../../enums';
import styles from './styles';

export default class NavbarButton extends Component {

  static propTypes = {
    position: PropTypes.string,
    theme: PropTypes.string,
    color: PropTypes.string,
    bgColor: PropTypes.string,
    disabled: PropTypes.bool,
    textStyle: PropTypes.any,
    style: PropTypes.any,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    position: 'right', // [left, right]
    theme: themeEnum.light,
    disabled: false,
  };

  onPress = () => {
    this.props.onPress && this.props.onPress();
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
    let {position, theme, color, bgColor, disabled, style} = this.props;
    const _styles = styles({theme, color, bgColor, position});

    return (
      <TouchableOpacity style={[_styles.container, style]}
                        disabled={disabled}
                        onPress={this.onPress}>
        {this.renderText(_styles)}
      </TouchableOpacity>
    );
  }
}
