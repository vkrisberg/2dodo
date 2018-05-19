import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import PropTypes from 'prop-types';
import {
  View,
  TouchableWithoutFeedback
} from 'react-native';

import Link from '../../components/elements/link';
import LoginForm from '../../components/forms/login';
import routeEnum from '../../enums/route-enum';
import Logo from '../../components/elements/logo';
import BackgroundContainer from '../background-container';
import {ws} from '../../utils';
import CONFIG from '../../config';
import {storageEnum} from '../../enums';
import {accountActions} from '../../store/actions';
import backgroundImage from './img/background.png';
import {
  StyledText,
  StyledLink,
  StyledRegistration,
  StyledKeysImport,
  RegistrationLabel
} from './styles';

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
      <BackgroundContainer image={backgroundImage}>
        <Logo flex={false}/>
        <StyledText>Please enter your email and pass</StyledText>
        <LoginForm onSubmit={this.onLogin}/>
        <View>
          <StyledLink to={routeEnum.ForgotPassword}>Forget password?</StyledLink>
          <StyledRegistration>
            <RegistrationLabel>First time in app?</RegistrationLabel>
            <Link color="#4d8fdb" to={routeEnum.Registration}>Registration</Link>
          </StyledRegistration>
          <TouchableWithoutFeedback  onPress={this.toKeyImport}>
            <StyledKeysImport>
              Key import
            </StyledKeysImport>
          </TouchableWithoutFeedback>
        </View>
      </BackgroundContainer>
    );
  }
}

export default connect(state => ({
  account: state.account,
}))(withNavigation(Login));
