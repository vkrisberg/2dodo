import React, {Component} from 'react';
import {KeyboardAvoidingView, View, Alert, ActionSheetIOS} from 'react-native';
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

  wsConnect = ({deviceId, user, keys}) => {
    services.websocketConnect({
      deviceId,
      username: user.username,
      password: keys.hashKey,
    });
  };

  login = async (data) => {
    const {dispatch} = this.props;
    const {login, password} = data;

    this.setState({
      errors: {
        login: !login,
        password: !password,
      },
    });

    if (!login || !password) {
      return false;
    }

    const _username = `${login.trim().toLowerCase()}@${CONFIG.hostname}`;
    const account = this.realm.objectForPrimaryKey(dbEnum.Account, _username);

    if (!account) {
      this.setState({
        errors: {
          login: true,
          password: true,
        },
      });
      return false;
    }

    const {deviceId, user, keys} = account;
    dispatch(accountActions.login({deviceId, user, keys}))
      .then(() => {
        this.wsConnect({deviceId, user, keys});
        this.props.navigation.replace(routeEnum.Messages);
      })
      .catch((error) => {
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
    const options = [t('EnterKey'), t('ReadQrCode'), t('RestoreFromBackup'), t('Cancel')];
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
        <BackgroundLayout background="login">
          <DismissKeyboardLayout>
            <KeyboardAvoidingView style={LoginStyles.container} behavior="position" enabled>
              <Logo style={LoginStyles.logo}/>
              <StyledText>{t('LoginWelcome')}</StyledText>
              <LoginForm context={this.context} errors={this.state.errors} onSubmit={this.login}/>
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
