import React, {Component} from 'react';
import {Switch} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

export default class SwitchComp extends Component {

  static propTypes = {
    input: PropTypes.shape({}),
    disabled: PropTypes.bool,
    turnedOnColor: PropTypes.string,
    turnedOffColor: PropTypes.string,
    style: PropTypes.any,
  };

  render() {
    const {
      input,
      disabled,
      turnedOnColor,
      turnedOffColor,
      style,
    } = this.props;

    return (
      <Switch
        style={[styles.container, style]}
        onTintColor={turnedOnColor}
        tintColor={turnedOffColor || undefined}
        disabled={disabled}
        value={!!input.value}
        onValueChange={input.onChange}/>
    );
  }
}
