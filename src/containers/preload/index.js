import React, { Component } from 'react';
import { Text } from 'react-native';

import routeEnum from '../../enums/route-enum';
import styles from './styles';
import BackgroundContainer from '../background-container';
import Logo from '../../components/elements/logo';

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
        <Logo />
        <Text style={styles.text}>
          Do what you want
        </Text>
      </BackgroundContainer>
    );
  }
}
