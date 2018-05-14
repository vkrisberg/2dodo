import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

export default class Title extends PureComponent {
  render() {
    const { children, value, style, textStyle } = this.props;
    
    return (
      <View style={[styles.wrapper, style]}>
        <Text style={[styles.title, textStyle]}>{children || value}</Text>
      </View>
    );
  }
}
