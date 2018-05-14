import React, { PureComponent } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

export default class Button extends PureComponent {
  
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    children: PropTypes.string,
    title: PropTypes.string,
    style: ViewPropTypes.style,
    wrapperStyle: ViewPropTypes.style,
    textStyle: ViewPropTypes.style
  }
  
  render() {
    const {
      onPress,
      children,
      title,
      style,
      wrapperStyle,
      textStyle
    } = this.props;

    return (
      <View style={[styles.container, style]}>
        <TouchableOpacity style={[wrapperStyle, styles.button]} onPress={onPress} {...this.props} >
          <Text style={[textStyle, styles.buttonText]}>{ children || title }</Text>
        </TouchableOpacity>
      </View>
    );
  }
}