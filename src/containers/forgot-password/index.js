import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';

// import chatIcon from '../login/img/chat.png';
import styles from './styles';
import Title from '../../components/elements/title';
import ForgotPasswordForm from '../../components/forms/forgot-password';
import Arrow from '../../components/elements/arrow';
import routeEnum from '../../enums/route-enum';

class ForgotPassword extends Component {

  returnToLogin = () => (
    this.props.navigation.navigate(routeEnum.Login)
  )

  render() {
    return (
      <View style={styles.container}>
        <Arrow onPress={this.returnToLogin} />
        {/* <View style={styles.logo}>
          <Image
            source={chatIcon}
          />
        </View> */}
        <Title>Забытый пароль</Title>
        <Text style={styles.description}>Укажите адрес электронной почты связанный с вашей учетной записью</Text>
        <ForgotPasswordForm />
      </View>
    );
  }
}

export default connect()(ForgotPassword);
