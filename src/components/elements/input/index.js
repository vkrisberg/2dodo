import React, {Component} from 'react';
import {TextInput, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';

import {colors} from '../../../styles';
import {StyledInput} from './styles';

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false
    };
  }

  static propTypes = {
    input: PropTypes.shape({}),
    placeholder: PropTypes.string,
    focusedColor: PropTypes.string,
    textColor: PropTypes.string,
    style: PropTypes.any,
  };

  handleFocus = () => this.setState({focused: true});

  handleBlur = () => this.setState({focused: false});

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
        placeholderTextColor="#5c94dd"
        value={input.value}
        placeholder={placeholder}
        onChangeText={input.onChange}
        focusedColor={focusedColor}
        textColor={textColor || colors.white}
        selectionColor={focusedColor ? focusedColor : colors.white}
        style={style}
        focused={this.state.focused}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        {...inputProps}
      />
    );
  }
}
