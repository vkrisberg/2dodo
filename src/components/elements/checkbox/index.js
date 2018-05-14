import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableWithoutFeedback,
  ViewPropTypes,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';

const hitSlop = {
  top: 8,
  bottom: 8,
  left: 8,
  right: 8
};

export default class RoundCheckbox extends PureComponent {
  static propTypes = {
    onValueChange: PropTypes.func,
    icon: PropTypes.string,
    size: PropTypes.number,
    backgroundColor: PropTypes.string,
    iconColor: PropTypes.string,
    borderColor: PropTypes.string,
    checked: PropTypes.bool,
    style: ViewPropTypes.style,
    label: PropTypes.string
  };

  static defaultProps = {
    icon: 'ios-checkmark',
    size: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    iconColor: 'white',
    borderColor: 'white',
    checked: false,
    onValueChange: () => {},
  };

  render() {
    const {
      size,
      style,
      icon,
      checked,
      iconColor
    } = this.props;
    const iconSize = parseInt(size * 1.3);

    return (
      <TouchableWithoutFeedback hitSlop={hitSlop} onPress={this._onPress}>
        <View style={style}>
          <Text style={styles.label}>{this.props.label}</Text>
          <View
            shouldRasterizeIOS={true}
            style={[this.getIconWrapperStyle(), styles.commonWrapperStyles]}
          >
            <Icon
              name={icon}
              color={checked ? iconColor : 'transparent'}
              style={{ height: iconSize, fontSize: iconSize, backgroundColor: 'transparent' }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _onPress = () => {
    this.props.onValueChange(!this.props.checked);
  };

  getIconWrapperStyle() {
    const {
      size,
      checked,
      backgroundColor,
      borderColor
    } = this.props;

    return {
      width: size,
      height: size,
      backgroundColor: checked ? backgroundColor : 'transparent',
      borderColor,
      borderRadius: size / 2,
    };
  }
}