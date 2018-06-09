import React, {Component} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  View,
  Alert,
} from 'react-native';

import {MainLayout, BackgroundLayout, DismissKeyboardLayout} from '../../components/layouts';
import LoginForm from '../../components/forms/login';
import {routeEnum, dbEnum} from '../../enums';
import {Logo, Button, Link} from '../../components/elements';
import {services} from '../../utils';
import {accountActions} from '../../store/actions';
import {
  StyledText,
  StyledRegistration,
  RegistrationLabel,
  StyledKeysImport,
  LoginStyles,
} from './styles';
import {colors, sizes} from '../../styles';
import CONFIG from '../../config';

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
    const {t} = this.context;
    const {login, password} = data;

    if (!login || !password) {
      Alert.alert(t('LoginEmptyError'));
      return null;
    }

    const _username = `${login.trim().toLowerCase()}@${CONFIG.hostname}`;
    const account = this.realm.objectForPrimaryKey(dbEnum.Account, _username);

    if (!account) {
      Alert.alert(t('LoginEnterError'));
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

  keysImport = () => {

  };

  render() {
    const {account} = this.props;
    const {t} = this.context;
    const labels = {
      login: t('Login'),
      password: t('Password'),
      security: t('ForBestSecurity'),
      createKey: t('CreateNewKey'),
      enter: t('Enter'),
    };
    const forgotLinkColor = sizes.isIphone5 ? colors.light.blueDarker : colors.light.white;

    return (
      <MainLayout netOffline={!account.net.connected}>
        <BackgroundLayout background="login">
          <DismissKeyboardLayout>
            <KeyboardAvoidingView style={LoginStyles.container} behavior="position" enabled>
              <Logo style={LoginStyles.logo}/>
              <StyledText>{t('LoginWelcome')}</StyledText>
              <LoginForm labels={labels} onSubmit={this.login}/>
            </KeyboardAvoidingView>
            <Link style={LoginStyles.forgot}
                  to={routeEnum.ForgotPassword}
                  color={forgotLinkColor}>{t('ForgotPassword')}</Link>
            <StyledRegistration>
              <RegistrationLabel>{t('FirstTimeInApp')}</RegistrationLabel>
              <Link to={routeEnum.Registration}
                    color={colors.light.blueDarker}>{t('Registration')}</Link>
            </StyledRegistration>
            <View style={LoginStyles.keysImportContainer}>
              <Button style={LoginStyles.keysImportButton}
                      color={colors.light.grayDarker}
                      bgColor={colors.light.whiteSmoke}
                      onPress={this.keysImport}>
                {t('KeysImport')}
              </Button>
            </View>
          </DismissKeyboardLayout>
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  account: state.account,
}))(withNavigation(Login));
