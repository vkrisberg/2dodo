import React, {Component} from 'react';
import {
  View,
  Text, AsyncStorage
} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import PropTypes from 'prop-types';

import Link from '../../components/elements/link';
import styles from './styles';
import LoginForm from '../../components/forms/login';
import routeEnum from '../../enums/route-enum';
import Logo from '../../components/elements/logo';
import BackgroundContainer from '../background-container';
import Button from '../../components/elements/button';
import {ws} from '../../utils';
import CONFIG from '../../config';
import {storageEnum} from '../../enums';
import {accountActions} from '../../store/actions';

class Login extends Component {

  static propTypes = {
    account: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({navigate: PropTypes.func})
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  wsConnect = ({deviceId, user, keys}) => {
    ws.init({
      deviceId,
      username: user.username,
      password: keys.hashKey,
      navigation: this.props.navigation,
    });
  };

  onLogin = async () => {
    const {dispatch, navigation} = this.props;
    let {deviceId, user, keys} = this.props.account;
    if (!user.nickname || !keys.hashKey) {
      user = JSON.parse(await AsyncStorage.getItem(`${CONFIG.storagePrefix}:${storageEnum.user}`));
      keys = JSON.parse(await AsyncStorage.getItem(`${CONFIG.storagePrefix}:${storageEnum.keys}`));
    }
    // console.log('onLogin USER', user);
    // console.log('onLogin KEYS', keys);
    // console.log('onLogin DEVICE', deviceId);
    dispatch(accountActions.login({navigation, deviceId, user, keys}))
      .then(() => {
        this.wsConnect({deviceId, user, keys});
      })
      .catch((error) => {
        console.log('login error', error);
      });
  };

  toKeyImport = () => {
    // return this.props.navigation.navigate(routeEnum.ImportKey);
  };

  render() {
    return (
      <BackgroundContainer>
        <Logo/>
        <Text style={styles.text}>Please enter your email and pass</Text>
        <LoginForm onSubmit={this.onLogin}/>
        <View>
          <Link style={styles.link} to={routeEnum.ForgotPassword}>Forget password?</Link>
          <View style={styles.registration}>
            <Text style={{marginRight: 10, color: '#ced9e8'}}>First time in app?</Text>
            <Link color={'blue'} to={routeEnum.Registration}>Registration</Link>
          </View>
          <Button wrapperStyle={{backgroundColor: 'grey'}} onPress={this.toKeyImport}>Key import</Button>
        </View>
      </BackgroundContainer>
    );
  }
}

export default connect(state => ({
  account: state.account,
}))(withNavigation(Login));
