import React, {PureComponent} from 'react';
// import {TextInput} from 'react-native';
import PropTypes from 'prop-types';

import {StyledTextInput} from './styles';
import {colors} from '../../../styles';
import {themeEnum} from '../../../enums';

export default class Input extends PureComponent {

  static propTypes = {
    theme: PropTypes.string,
    input: PropTypes.shape({}),
    placeholder: PropTypes.string,
    textColor: PropTypes.string,
    focusedColor: PropTypes.string,
    borderColor: PropTypes.string,
    placeholderColor: PropTypes.string,
    style: PropTypes.any,
  };

  static defaultProps = {
    theme: themeEnum.light,
    placeholder: '',
    textColor: colors.light.black,
    focusedColor: colors.light.blue,
    borderColor: colors.light.gray,
    placeholderColor: colors.light.grayPlaceholder,
  };

  constructor(props) {
    super(props);

    this.state = {
      focused: false,
    };
  }

  handleFocus = () => this.setState({focused: true});

  handleBlur = () => this.setState({focused: false});

  render() {
    const {
      input,
      placeholder,
      textColor,
      focusedColor,
      borderColor,
      placeholderColor,
      style,
      ...inputProps
    } = this.props;

    return (
      <StyledTextInput
        underlineColorAndroid="transparent"
        value={input.value}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        textColor={textColor}
        focusedColor={focusedColor}
        borderColor={borderColor}
        selectionColor={focusedColor}
        style={style}
        focused={this.state.focused}
        onChangeText={input.onChange}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        {...inputProps}
      />
    );
  }
}
