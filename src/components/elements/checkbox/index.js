import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableWithoutFeedback,
  ViewPropTypes
} from 'react-native';

import {CommonWrapper, Label} from './styles';
import Icon from './icon';

const hitSlop = {
  top: 8,
  bottom: 8,
  left: 8,
  right: 8
};

export default class RoundCheckbox extends PureComponent {
  
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    checked: PropTypes.bool,
    style: ViewPropTypes.style,
    label: PropTypes.string,
    color: PropTypes.string
  };

  static defaultProps = {
    checked: false,
  };

  render() {
    const {
      style,
      color,
      label,
      checked
    } = this.props;

    return (
      <TouchableWithoutFeedback hitSlop={hitSlop} onPress={this._onPress}>
        <CommonWrapper style={style}>
          <Label color={color}>{label}</Label>
          <Icon checked={checked} />
        </CommonWrapper>
      </TouchableWithoutFeedback>
    );
  }

  _onPress = () => {
    this.props.onPress(!this.props.checked);
  };
}