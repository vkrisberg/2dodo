import React, { PureComponent } from 'react';
import { View, Image } from 'react-native';

import styles from './styles.js';
import backgroundImage from './img/background.jpg';
import wavesImage from './img/waves.png';

export default class BackgroundContainer extends PureComponent{
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.background} source={backgroundImage} />
        { this.props.children }
        <Image style={styles.waves} source={wavesImage} />
      </View>
    );
  }
}