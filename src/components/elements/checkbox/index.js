import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {View, Image, TouchableWithoutFeedback} from 'react-native';

import styles from './styles';

import IMG_CHECKBOX_OFF from './img/checkbox.png';
import IMG_CHECKBOX_ON from './img/checkbox_active.png';

const hitSlop = {
  top: 8,
  bottom: 8,
  left: 8,
  right: 8
};

export default class Checkbox extends PureComponent {

  static propTypes = {
    input: PropTypes.shape({value: PropTypes.any}),
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

  componentDidUpdate() {
    const value = !!this.props.input.value;
    if (this.state.checked !== value) {
      this.setState({
        checked: value,
      });
    }
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
    const imageStyles = [styles.image];

    if (!this.state.checked && color) {
      imageStyles.push({tintColor: color});
    }

    return (
      <TouchableWithoutFeedback hitSlop={hitSlop} onPress={this.onPress}>
        <View style={[styles.container, style]}>
          {(!color || (color && this.state.checked)) && <Image
            style={imageStyles}
            source={this.state.checked ? IMG_CHECKBOX_ON : IMG_CHECKBOX_OFF}/>}
          {color && !this.state.checked && <Image
            style={imageStyles}
            tintColor={color}
            source={this.state.checked ? IMG_CHECKBOX_ON : IMG_CHECKBOX_OFF}/>}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
