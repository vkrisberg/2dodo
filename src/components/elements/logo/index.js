import React, { PureComponent } from 'react';
import { View, Image } from 'react-native';

import styles from './styles';
import logoIcon from './img/logo.png';
import logoTitleIcon from './img/title.png';

export default class Logo extends PureComponent {
  render() {
    return (
      <View style={[styles.logoContainer, this.props.style]}>
        <Image style={styles.logo} source={logoIcon} />
        <Image style={styles.logoTitle} source={logoTitleIcon} />
      </View>
    );
  }
}