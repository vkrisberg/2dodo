import React, {Component} from 'react';
import {
  View,
  Text
} from 'react-native';
import {connect} from 'react-redux';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

import Link from '../../components/elements/link';
import styles from './styles';
import LoginForm from '../../components/forms/login';
import routeEnum from '../../enums/route-enum';
import Logo from '../../components/elements/logo';
import BackgroundContainer from '../background-container';
import Button from '../../components/elements/button';

class Login extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({ navigate: PropTypes.func })
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  toKeyImport = () => {
    return this.props.navigation.navigate(routeEnum.ImportKey);
  }

  render() {
    return (
      <BackgroundContainer>
        <Logo />
        <Text style={styles.text}>Please enter your email and pass</Text>
        <LoginForm />
        <View>
          <Link style={styles.link} to={routeEnum.ForgotPassword}>Forget password?</Link>
          <View style={styles.registration}>
            <Text style={{marginRight: 10, color: '#ced9e8'}}>First time in app?</Text>
            <Link style={{ color: 'blue' }} to={routeEnum.Registration}>Registration</Link>
          </View>
          <Button wrapperStyle={{backgroundColor: 'grey'}} onPress={this.toKeyImport}>Key import</Button>
        </View>
      </BackgroundContainer>
    );
  }
}

export default connect(state => ({}))(withNavigation(Login));
