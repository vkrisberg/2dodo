import React, { Component } from 'react';
import { TextInput, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import {StyledInput} from './styles';

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false
    };
  }

  static propTypes = {
    placeholder: PropTypes.string,
    input: PropTypes.shape({}),
    style: ViewPropTypes.style,
    focusedColor: PropTypes.string,
    textColor: PropTypes.string
  };

  handleFocus = () => this.setState({ focused: true });

  handleBlur = () => this.setState({ focused: false });

  render() {
    const {
      input,
      placeholder,
      style,
      focusedColor,
      textColor,
      ...inputProps
    } = this.props;

    return (
      <StyledInput
        underlineColorAndroid="transparent"
        placeholderTextColor="#ced9e8"
        onChangeText={input.onChange}
        focused={this.state.focused}
        focusedColor={focusedColor}
        textColor={textColor}
        selectionColor={focusedColor ? focusedColor : 'white'}
        style={style}
        placeholder={placeholder}
        value={input.value}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        {...inputProps}
      />
    );
  }
}