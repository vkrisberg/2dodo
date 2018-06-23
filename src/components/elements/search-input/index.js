import React, {Component} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

import {TextLabel} from '../index';
import {SearchIcon} from '../../icons';
import {themeEnum} from '../../../enums';
import {colors} from '../../../styles';
import styles from './styles';

import IMG_CLOSE_ICON from './img/close.png';

export default class SearchInput extends Component {
  static propTypes = {
    value: PropTypes.string,
    theme: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    style: PropTypes.any,
  };

  static defaultProps = {
    value: '',
    theme: themeEnum.light,
  };

  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      value: props.value,
    };
  }

  onFocus = () => {
    !this.state.focused && this.setState({focused: true});
  };

  onBlur = () => {
    this.state.focused && this.setState({focused: false});
  };

  onChange = (value) => {
    this.setState({value});
    this.props.onChange && this.props.onChange(value);
  };

  onClear = () => {
    this.setState({value: ''});
    this.props.onChange && this.props.onChange('');
  };

  renderPlaceholder = (_styles) => {
    const {theme} = this.props;
    const {focused, value} = this.state;

    if (!focused && !value) {
      return (
        <TextLabel style={_styles.placeholder} color={colors[theme].grayInput} size={13}>
          {this.props.placeholder}
        </TextLabel>
      );
    }
  };

  renderClearButton = (_styles) => {
    if (this.state.focused) {
      return (
        <TouchableOpacity style={_styles.closeIcon} onPress={this.onClear}>
          <Image source={IMG_CLOSE_ICON}/>
        </TouchableOpacity>
      );
    }
  };

  render() {
    const {theme, style} = this.props;
    const {focused, value} = this.state;
    const _styles = styles(theme);
    const colorIcon = focused ? colors[theme].grayBlue : colors[theme].grayIcon;

    return (
      <View style={[_styles.container, style]}>
        <View style={_styles.searchIcon}>
          <SearchIcon color={colorIcon}/>
        </View>
        {this.renderClearButton(_styles)}
        {this.renderPlaceholder(_styles)}
        <View style={_styles.inputContainer}>
          <TextInput
            value={value}
            style={_styles.input}
            underlineColorAndroid="transparent"
            selectionColor={colors[theme].blue}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChangeText={this.onChange}
            autoCapitalize={'none'}
            autoCorrect={false}
            multiline={false}
          />
        </View>
      </View>
    );
  }
}
