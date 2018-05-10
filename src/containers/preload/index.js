import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

import Title from '../../components/elements/title';
import routeEnum from '../../enums/route-enum';
import chatIcon from '../login/img/chat.png';

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
        <Image style={styles.image} source={chatIcon} />
        <Title>2DODO</Title>
        <Text style={styles.text}>
          Do what you want
        </Text>
      </View>
    );
  }
}
