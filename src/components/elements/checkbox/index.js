import React, { Component } from 'react';
import { View, Text, TouchableHighlight, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import CheckBox from 'react-native-check-box';

import styles from './styles';

export default class Checkbox extends Component {

  static propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func,
    style: ViewPropTypes.style
  }

  handleClick = () => {
    const { onClick } = this.props;

    return onClick ? onClick() : null;
  }

  render() {
    return (
      <CheckBox
        style={[this.props.style, styles.checkbox]}
        leftText={this.props.label}
        onClick={this.handleClick}
      />
    );
  }
}