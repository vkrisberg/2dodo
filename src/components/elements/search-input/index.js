import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';

import SearchIcon from '../../icons/search-icon';
import {SearchInputView, IconContainer} from './styles';

export default class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocused: false
    };
  }

  onFocus = () => !this.state.isFocused && this.setState({isFocused: true})
  onFocus = () => this.state.isFocused && this.setState({isFocused: false})

  render() {
    return (
      <SearchInputView>
        <IconContainer>
          <SearchIcon />
        </IconContainer>
        <Text>Search contacts</Text>
        <View style={{ position: 'absolute', top: '5%', alignItems: 'center', width: 220}}>
          <TextInput
            style={{height: 35, width: '100%'}}
            underlineColorAndroid="transparent"
            selectionColor="#999"
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
        </View>
        {/* <TextInput placeholder="Search contacts" /> */}
      </SearchInputView>
    );
  }
}