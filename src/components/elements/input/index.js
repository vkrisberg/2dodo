import React, { Component } from 'react';
import { TextInput, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

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
    style: ViewPropTypes.style
  };

  handleFocus = () => this.setState({ focused: true });

  handleBlur = () => this.setState({ focused: false });

  render() {
    const { input, placeholder, style, ...inputProps } = this.props;

    return (
      <TextInput
        underlineColorAndroid="transparent"
        placeholderTextColor="#ced9e8"
        onChangeText={input.onChange}
        style={[styles.input, this.state.focused && styles.inputFocused, style]}
        placeholder={placeholder}
        value={input.value}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        {...inputProps}
      />
    );
  }
}