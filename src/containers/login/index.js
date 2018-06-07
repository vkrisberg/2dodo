import React, {Component} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  View,
  Alert,
} from 'react-native';

import {BackgroundLayout, DismissKeyboardLayout} from '../../components/layouts';
import Link from '../../components/elements/link';
import LoginForm from '../../components/forms/login';
import {routeEnum, dbEnum} from '../../enums';
import Logo from '../../components/elements/logo';
import {services} from '../../utils';
import {accountActions} from '../../store/actions';
import {
  StyledText,
  StyledLink,
  StyledRegistration,
  RegistrationLabel
} from './styles';
import {LoginStyles} from './styles';
import CONFIG from '../../config';

const logoStyle = {marginTop: 58};
const linkStyle = {fontWeight: 'bold'};

class Login extends Component {

  static propTypes = {
    account: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({navigate: PropTypes.func})
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.realm = services.getRealm();
  }

  wsConnect = ({deviceId, user, keys}) => {
    services.websocketConnect({
      deviceId,
      username: user.username,
      password: keys.hashKey,
    });
  };

  login = async (data) => {
    const {dispatch} = this.props;
    const {username} = data;

    if (!username) {
      Alert.alert('Fill username field');
      return null;
    }

    const _username = `${username.trim().toLowerCase()}@${CONFIG.hostname}`;
    const account = this.realm.objectForPrimaryKey(dbEnum.Account, _username);

    if (!account) {
      Alert.alert('Wrong username');
      return null;
    }

    const {deviceId, user, keys} = account;
    dispatch(accountActions.login({deviceId, user, keys}))
      .then(() => {
        this.wsConnect({deviceId, user, keys});
        this.props.navigation.replace(routeEnum.Messages);
      })
      .catch((error) => {
        console.error('login error', error);
        Alert.alert('Login error');
      });
  };

  render() {
    const {t} = this.context;

    return (
      <BackgroundLayout background="login">
        <DismissKeyboardLayout>
          <KeyboardAvoidingView style={LoginStyles.container} behavior="position" enabled>
            <Logo style={logoStyle} flex={false}/>
            <StyledText>{t('Welcome')}</StyledText>
            <LoginForm placeholder={t('LoginPlaceholder')} onSubmit={this.login}/>
            {/*<StyledLink to={routeEnum.ForgotPassword}>{t('ForgetPassword')}</StyledLink>*/}
            <StyledRegistration>
              <RegistrationLabel>{t('FirstTimeInApp')}</RegistrationLabel>
              <Link style={linkStyle} color="white" to={routeEnum.Registration}>{t('Registration')}</Link>
            </StyledRegistration>
          </KeyboardAvoidingView>
        </DismissKeyboardLayout>
      </BackgroundLayout>
    );
  }
}

export default connect(state => ({
  account: state.account,
}))(withNavigation(Login));
