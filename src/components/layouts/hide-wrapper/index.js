import React, {PureComponent} from 'react';
import {View} from 'react-native';
import styles from './styles';

export default class HideWrapper extends PureComponent {
  render() {
    const {children} = this.props;

    return (
      <View pointerEvents={'none'} style={[styles.container, this.props.style]}>
        {children}
      </View>
    );
  }
}
