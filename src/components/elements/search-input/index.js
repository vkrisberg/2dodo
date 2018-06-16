import React, {Component} from 'react';

import SearchIcon from '../../icons/search-icon';
import {
  SearchInputView,
  IconContainer,
  InputView,
  StyledInput,
  StyledText
} from './styles';

export default class SearchInput extends Component {
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
  }

  onChange = (value) => {
    if (this.props.onChange) {
      this.props.onChange(value);
    }

    this.setState({value});
  };

  render() {
    const {isFocused, value} = this.state;

    return (
      <SearchInputView>
        <IconContainer>
          <SearchIcon/>
        </IconContainer>
        {!isFocused && !value && <StyledText>{this.props.placeholder}</StyledText>}
        <InputView>
          <StyledInput
            underlineColorAndroid="transparent"
            selectionColor="#999"
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChangeText={this.onChange}
          />
        </InputView>
      </SearchInputView>
    );
  }
}
