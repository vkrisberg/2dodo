import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import Arrow from '../../components/elements/arrow';
import styles from './styles';
import routeEnum from '../../enums/route-enum';
import Title from '../../components/elements/title';
import Button from '../../components/elements/button';
import Logo from '../../components/elements/logo';

class PasswordApprove extends Component {

  returnToLogin = () => (
    this.props.navigation.navigate(routeEnum.Login)
  )

  render() {
    const { params } = this.props.navigation.state;

    return (
      <View style={styles.container}>
        <Arrow onPress={this.returnToLogin} />
        <Logo />
        <Title>Успех</Title>
        <Text style={styles.description}>
          Письмо с восстановлением пароля
          выслано на {params.email}
        </Text>
        <Button onPress={this.returnToLogin}>Войти</Button>
      </View>
    );
  }
}

export default connect()(PasswordApprove);