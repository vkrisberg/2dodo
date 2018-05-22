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
      isFocused: false
    };
  }

  onFocus = () => !this.state.isFocused && this.setState({isFocused: true})

  onBlur = () => this.state.isFocused && this.setState({isFocused: false})

  onChange = () => {
    return null;
  }

  render() {
    return (
      <SearchInputView>
        <IconContainer>
          <SearchIcon />
        </IconContainer>
        {!this.state.isFocused && <StyledText>{this.props.placeholder}</StyledText>}
        <InputView>
          <StyledInput
            underlineColorAndroid="transparent"
            selectionColor="#999"
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.onChange}
          />
        </InputView>
      </SearchInputView>
    );
  }
}