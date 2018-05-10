import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

import routeEnum from '../../enums/route-enum';
import logoIcon from './img/logo.png';
import logoTitleIcon from './img/title.png';
import styles from './styles';
import BackgroundContainer from '../background-container';

export default class Preload extends Component {
  componentDidMount() {
    this.handleTimeout = setTimeout(() => { this.props.navigation.navigate(routeEnum.Events); }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.handleTimeout);
  }

  render() {
    return (
      <BackgroundContainer style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={logoIcon} />
          <Image style={styles.logoTitle} source={logoTitleIcon} />
        </View>
        <Text style={styles.text}>
          Do what you want
        </Text>
      </BackgroundContainer>
    );
  }
}
