import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableWithoutFeedback,
} from 'react-native';

import Icon from './icon';
import styles from './styles';

const hitSlop = {
  top: 8,
  bottom: 8,
  left: 8,
  right: 8
};

export default class CheckboxSvg extends PureComponent {

  static propTypes = {
    input: PropTypes.shape({}),
    disabled: PropTypes.bool,
    color: PropTypes.string,
    style: PropTypes.any,
  };

  static defaultProps = {
    input: {},
    disabled: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      checked: !!props.input.value,
    };
  }

  onPress = () => {
    const {input: {onChange}, disabled} = this.props;

    if (!disabled) {
      this.setState({checked: !this.state.checked}, () => {
        if (onChange) {
          onChange(this.state.checked);
        }
      });
    }
  };

  render() {
    const {
      color,
      style,
    } = this.props;

    return (
      <TouchableWithoutFeedback hitSlop={hitSlop} onPress={this.onPress}>
        <View style={[styles.container, style]}>
          <Icon color={color} checked={this.state.checked}/>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
