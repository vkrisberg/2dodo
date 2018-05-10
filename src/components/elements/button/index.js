import React, { PureComponent } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

export default class Button extends PureComponent {
  
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    children: PropTypes.string,
    title: PropTypes.string,
    style: PropTypes.shape({})
  }
  
  render() {
    const { onPress, children, title, style } = this.props;

    return (
      <View style={[styles.container, style]}>
        <TouchableOpacity style={styles.button} onPress={onPress} {...this.props} >
          <Text style={styles.buttonText}>{ children || title }</Text>
        </TouchableOpacity>
      </View>
    );
  }
}