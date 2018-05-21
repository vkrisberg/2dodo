import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import PropTypes from 'prop-types';
import {
  AsyncStorage,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import Realm from 'realm';

import Link from '../../components/elements/link';
import LoginForm from '../../components/forms/login';
import routeEnum from '../../enums/route-enum';
import Logo from '../../components/elements/logo';
import BackgroundContainer from '../background-container';
import {ws} from '../../utils';
import CONFIG from '../../config';
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

  constructor(props) {
    super(props);
    this.realm = null;
  }

  componentWillUnmount() {
    if (this.realm) {
      this.realm.close();
    }
  }

  wsConnect = ({deviceId, user, keys}) => {
    ws.init({
      deviceId,
      username: user.username,
      password: keys.hashKey,
      navigation: this.props.navigation,
    });
  };

  onLogin = async () => {
    const {dispatch} = this.props;
    const username = this.props.login.values ? this.props.login.values.username : '';

    if (!username) {
      return false;
    }

    const realm = await Realm.open(CONFIG.realmConfig)
      .then((realm) => {
        return realm;
      })
      .catch((error) => {
        console.log('error connecting to database', error);
        throw new Error('login failed: error connecting to database');
      });
    const account = realm.objectForPrimaryKey('Account', username.toLowerCase());
    if (!account) {
      return false;
    }
    const {deviceId, user, keys} = account;

    dispatch(accountActions.login({deviceId, user, keys}))
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
          <TouchableWithoutFeedback onPress={this.toKeyImport}>
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
  login: state.form.login,
}))(withNavigation(Login));
