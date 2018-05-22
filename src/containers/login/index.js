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

  login = async (data) => {
    const {dispatch} = this.props;
    const {username} = data;

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
      console.log('login error: account is not found');
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
    const { t } = this.context;

    return (
      <BackgroundContainer image={backgroundImage}>
        <Logo flex={false}/>
        <StyledText>{t('Welcome')}</StyledText>
        <LoginForm onSubmit={this.login}/>
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
