import React, {Component} from 'react';
import {
  Image,
  View,
  Text
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Title from '../../components/elements/title';
import Link from '../../components/elements/link';
import styles from './styles';
import LoginForm from '../../components/forms/login';
import routeEnum from '../../enums/route-enum';
import chatIcon from './img/chat.png';

class Login extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image
            source={chatIcon}
          />
        </View>
        <Title>Добро пожаловать</Title>
        <LoginForm />
        <View>
          <Link style={styles.link}  color="blue" to={routeEnum.ForgotPassword}>Восстановление пароля</Link>
          <View style={styles.registration}>
            <Text style={{marginRight: 10}}>Первый раз в приложении?</Text>
            <Link color="blue" to={routeEnum.Registration}>Регистрация</Link>
          </View>
          <Link color="blue" style={styles.keyImport} to={routeEnum.KeyImport}>Импортировать ключи</Link>
        </View>
      </View>
    );
  }
}

export default connect(state => ({}))(Login);
