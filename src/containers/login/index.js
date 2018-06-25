import React, {Component} from 'react';
import {KeyboardAvoidingView, View, Alert, ActionSheetIOS, AsyncStorage} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {MainLayout, BackgroundLayout, DismissKeyboardLayout} from '../../components/layouts';
import {LoginForm} from '../../components/forms';
import {Logo, Button, Link} from '../../components/elements';
import {routeEnum, dbEnum} from '../../enums';
import {services} from '../../utils';
import {accountActions} from '../../store/actions';
import {
  StyledText,
  StyledRegistration,
  RegistrationLabel,
  LoginStyles,
} from './styles';
import {colors, sizes} from '../../styles';
import {validation} from '../../utils';

class Login extends Component {

  static propTypes = {
    account: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({navigate: PropTypes.func})
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  state = {
    errors: {
      login: false,
      password: false,
    },
  };

  constructor(props) {
    super(props);
    this.realm = services.getRealm();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.account.error && this.props.account.error && this.props.account.error.indexOf('login error') > 0) {
      Alert.alert(this.context.t('LoginEnterError'));
      this.setState({
        errors: {
          login: true,
          password: true,
        },
      });
    }

    if (this.state.errors.login || this.state.errors.password) {
      setTimeout(() => this.setState({errors: {}}), 2000);
    }
  }

  login = async (data) => {
    const {dispatch, account} = this.props;
    const login = (data.login || '').trim().toLowerCase();
    const password = (data.password || '').trim();
    // const createNewKey = data.createNewKey || false;

    this.setState({
      errors: {
        login: !login,
        password: !password,
      },
    });

    if (!login || !password) {
      return false;
    }

    if (!validation.usernameRegex.test(login)) {
      this.setState({
        errors: {
          login: true,
          password: false,
        },
      });
      return false;
    }

    let username = login;

    if (login.indexOf('@') === -1) {
      username = `${login}@${account.hostname}`;
    }

    const realmAccount = this.realm.objectForPrimaryKey(dbEnum.Account, username);

    if (!realmAccount) {
      Alert.alert(this.context.t('LoginEnterError'));
      this.setState({
        errors: {
          login: true,
          password: true,
        },
      });
      return false;
    }

    const {deviceId, hostname, user, keys} = realmAccount;
    dispatch(accountActions.connect({deviceId, hostname, user, keys, password})).catch((error) => {
      console.error('login error', error);
      Alert.alert(this.context.t('LoginAuthError'));
      this.setState({
        errors: {
          login: true,
          password: true,
        },
      });
    });
  };

  keysImport = () => {
    const {t} = this.context;
    const options = [t('EnterKeyAction'), t('ReadQrCode'), t('RestoreFromBackup'), t('Cancel')];
    const cancelButtonIndex = -1;
    const destructiveButtonIndex = 3;

    ActionSheetIOS.showActionSheetWithOptions({
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        console.log('ActionSheetIOS', buttonIndex);
      });
  };

  render() {
    const {account} = this.props;
    const {t} = this.context;
    const forgotLinkColor = sizes.isIphone5 ? colors.light.blueDarker : colors.light.white;

    return (
      <MainLayout netOffline={!account.net.connected}>
        <BackgroundLayout background="login" barStyle="light-content">
          <DismissKeyboardLayout>
            <KeyboardAvoidingView style={LoginStyles.container} behavior="position" enabled>
              <Logo style={LoginStyles.logo}/>
              <StyledText>{t('LoginWelcome')}</StyledText>
              <LoginForm context={this.context}
                         errors={this.state.errors}
                         disabled={!account.net.connected || account.connecting}
                         onSubmit={this.login}/>
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
                      borderColor="transparent"
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
