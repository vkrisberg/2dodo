import React, {PureComponent} from 'react';
import {View, Keyboard, TouchableWithoutFeedback} from 'react-native';

export default class DismissKeyboardLayout extends PureComponent {
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          {this.props.children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
