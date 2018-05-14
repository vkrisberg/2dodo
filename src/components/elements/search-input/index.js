import React, { PureComponent } from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class SearchInput extends PureComponent {
  render() {
    return (
      <View>
        <Icon
          name="ios-search-outline" />
        <TextInput />
      </View>
    );
  }
}