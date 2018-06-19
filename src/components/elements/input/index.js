import React, {PureComponent} from 'react';
import {TextInput} from 'react-native';
import PropTypes from 'prop-types';

import {colors} from '../../../styles';
import {themeEnum} from '../../../enums';
import styles from './styles';

export default class Input extends PureComponent {

  static propTypes = {
    theme: PropTypes.string,
    input: PropTypes.shape({}),
    error: PropTypes.any,
    placeholder: PropTypes.string,
    color: PropTypes.string,
    focusedColor: PropTypes.string,
    borderColor: PropTypes.string,
    placeholderColor: PropTypes.string,
    errorColor: PropTypes.string,
    style: PropTypes.any,
    onSubmit: PropTypes.func,
    inputProps: PropTypes.object,
  };

  static defaultProps = {
    theme: themeEnum.light,
    error: false,
    placeholder: '',
    color: colors.light.black,
    focusedColor: colors.light.blue,
    borderColor: colors.light.gray,
    placeholderColor: colors.light.grayPlaceholder,
    errorColor: colors.light.red,
  };

  state = {
    focused: false,
  };

  handleFocus = () => {
    const {input} = this.props;
    this.setState({focused: true});
    input.onFocus && input.onFocus();
  };

  handleBlur = () => {
    const {input} = this.props;
    this.setState({focused: false});
    input.onBlur && input.onBlur();
  };

  render() {
    let {
      theme,
      input,
      error,
      placeholder,
      color,
      borderColor,
      focusedColor,
      placeholderColor,
      errorColor,
      style,
      onSubmit,
      ...inputProps,
    } = this.props;
    const borderWidth = this.state.focused || error ? 2 : 1;
    if (this.state.focused) {
      borderColor = focusedColor;
    }
    if (error) {
      borderColor = errorColor;
    }
    const _styles = styles({theme, color, borderColor, borderWidth});

    return (
      <TextInput
        underlineColorAndroid="transparent"
        value={input.value}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        selectionColor={focusedColor}
        style={[_styles.input, style]}
        onChangeText={input.onChange}
        onSubmitEditing={onSubmit}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        {...inputProps}
      />
    );
  }
}
