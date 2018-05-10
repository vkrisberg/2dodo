import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

import Title from '../../components/elements/title';
import routeEnum from '../../enums/route-enum';
import logoIcon from './img/logo.png';
import backgroundImage from './img/background.jpg';
import logoTitleIcon from './img/title.png';
import wavesImage from './img/waves.png';

import styles from './styles';

export default class Preload extends Component {
  componentDidMount() {
    this.handleTimeout = setTimeout(() => { this.props.navigation.navigate(routeEnum.Events); }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.handleTimeout);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.background} source={backgroundImage} />
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={logoIcon} />
          <Image style={styles.logoTitle} source={logoTitleIcon} />
        </View>
        <Text style={styles.text}>
          Do what you want
        </Text>
        <Image style={styles.waves} source={wavesImage} />
      </View>
    );
  }
}
