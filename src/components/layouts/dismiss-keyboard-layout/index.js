import React, {PureComponent} from 'react';
import {View, Keyboard, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

export default class DismissKeyboardLayout extends PureComponent {

  static propTypes = {
    style: PropTypes.any,
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={[styles.container, this.props.style]}>
          {this.props.children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
