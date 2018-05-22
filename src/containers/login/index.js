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

  wsConnect = () => {
    const {deviceId, user, keys} = this.props.account;

    ws.init({
      deviceId,
      username: user.username,
      hashKey: keys.hashKey,
      navigation: this.props.navigation,
    });
  };

  onLogin = () => {
    const {dispatch, navigation} = this.props;
    const {deviceId, user, keys} = this.props.account;

    dispatch(accountActions.login({navigation, deviceId, user, keys}))
      .then(() => {
        this.wsConnect();
      })
      .catch((error) => {
        console.log('login error', error);
      });
  };

  toKeyImport = () => {
    // return this.props.navigation.navigate(routeEnum.ImportKey);
  };

  render() {
    const { t } = this.context;

    return (
      <BackgroundContainer image={backgroundImage}>
        <Logo flex={false}/>
        <StyledText>{t('Welcome')}</StyledText>
        <LoginForm onSubmit={this.onLogin}/>
        <View>
          <StyledLink to={routeEnum.ForgotPassword}>{t('ForgetPassword')}</StyledLink>
          <StyledRegistration>
            <RegistrationLabel>{t('FirstTimeInApp')}</RegistrationLabel>
            <Link color="#4d8fdb" to={routeEnum.Registration}>{t('Registration')}</Link>
          </StyledRegistration>
          <TouchableWithoutFeedback  onPress={this.toKeyImport}>
            <StyledKeysImport>{t('KeysImport')}</StyledKeysImport>
          </TouchableWithoutFeedback>
        </View>
      </BackgroundContainer>
    );
  }
}

export default connect(state => ({
  account: state.account,
}))(withNavigation(Login));
