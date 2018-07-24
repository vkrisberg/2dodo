import React, {Component} from 'react';
import {Platform, KeyboardAvoidingView, View, Alert, ActionSheetIOS, AsyncStorage, Text} from 'react-native';
import {NavigationActions, StackActions, withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {MainLayout, BackgroundLayout, DismissKeyboardLayout} from '../../components/layouts';
import {LoginForm} from '../../components/forms';
import {Logo, Button, Link} from '../../components/elements';
import {routeEnum, dbEnum} from '../../enums';
import {services} from '../../utils';
import {accountActions} from '../../store/actions';
import {colors, sizes} from '../../styles';
import {validation} from '../../utils';
import styles from './styles';

const goToMessagesAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({routeName: routeEnum.Messages})],
});

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
    connecting: false,
    errors: {
      login: false,
      password: false,
    },
  };

  constructor(props) {
    super(props);
    this.realm = services.getRealm();
    this.styles = styles(props.account.user.theme);
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
    dispatch(accountActions.connect({deviceId, hostname, user, keys, password}))
      .then(() => {
        this.setState({
          connecting: true,
        });
        setTimeout(() => {
          if (this.props.account.error) {
            Alert.alert(this.context.t('LoginEnterError'));
            this.props.dispatch(accountActions.stopReconnect());
            this.setState({
              connecting: false,
              errors: {
                login: true,
                password: true,
              },
            });
            return;
          }
          this.props.navigation.dispatch(goToMessagesAction);
        }, 2000)
      })
      .catch((error) => {
        console.error('login error', error);
        Alert.alert(this.context.t('LoginAuthError'));
        this.setState({
          connecting: false,
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

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions({
          options,
          cancelButtonIndex,
          destructiveButtonIndex,
        },
        (buttonIndex) => {
          console.log('ActionSheetIOS', buttonIndex);
        });
    }
  };

  render() {
    const {account} = this.props;
    const {t} = this.context;
    const forgotLinkColor = (sizes.isIphone5 && Platform.OS === 'ios') ? colors.light.blueDarker : colors.light.white;

    return (
      <MainLayout netOffline={!account.net.connected}>
        <BackgroundLayout background="login" barStyle="light-content">
          <DismissKeyboardLayout>
            <KeyboardAvoidingView style={this.styles.container} behavior="position" enabled>
              <Logo style={this.styles.logo}/>
              <Text style={this.styles.text}>{t('LoginWelcome')}</Text>
              <LoginForm context={this.context}
                         errors={this.state.errors}
                         disabled={!account.net.connected || account.connecting || this.state.connecting}
                         onSubmit={this.login}/>
            </KeyboardAvoidingView>
            <Link style={this.styles.forgot}
                  to={routeEnum.ResetPassword}
                  color={forgotLinkColor}>{t('ForgotPassword')}</Link>
            <View style={this.styles.registration}>
              <Text style={this.styles.registrationLabel}>{t('FirstTimeInApp')}</Text>
              <Link to={routeEnum.Registration}
                    color={colors.light.blueDarker}>{t('Registration')}</Link>
            </View>
            <View style={this.styles.keysImportContainer}>
              <Button style={this.styles.keysImportButton}
                      color={colors.light.grayDarker}
                      borderColor="transparent"
                      onPress={this.keysImport}
                      disabled>
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
