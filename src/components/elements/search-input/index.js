import React, {Component} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

import {SearchIcon} from '../../icons';
import {themeEnum} from '../../../enums';
import styles from './styles';
import CloseIcon from './img/close.png';

export default class SearchInput extends Component {
  static propTypes = {
    theme: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    theme: themeEnum.light,
    onChange: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
      value: null
    };
  }

  onFocus = () => !this.state.isFocused && this.setState({isFocused: true});

  onBlur = () => {
    const {isFocused, value} = this.state;

    isFocused && this.setState({isFocused: false});
  };

  onChange = (value) => {
    if (this.props.onChange) {
      this.props.onChange(value);
    }

    this.setState({value});
  };

  onClearInput = () => {
    this.setState({
      value: null,
    });
  };

  render() {
    const {isFocused, value} = this.state;
    const {theme} = this.props;
    const _styles = styles(theme);

    return (
      <View style={_styles.searchInputView}>
        <View style={_styles.iconContainer}>
          <SearchIcon/>
          {isFocused && value && <TouchableOpacity onPress={this.onClearInput} style={_styles.closeIcon}>
            <Image source={CloseIcon}/>
          </TouchableOpacity>}
        </View>
        {!isFocused && !value && <Text style={_styles.styledText}>{this.props.placeholder}</Text>}
        <View style={_styles.inputView}>
          <TextInput
            style={_styles.styledInput}
            underlineColorAndroid="transparent"
            selectionColor="#62a3ff"
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChangeText={this.onChange}
          />
        </View>
      </View>
    );
  }
}
