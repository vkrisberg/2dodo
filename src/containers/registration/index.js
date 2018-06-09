import React, {Component} from 'react';
import {Alert} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {BackgroundLayout, DismissKeyboardLayout} from '../../components/layouts';
import {RegistrationForm} from '../../components/forms';
import {accountActions} from '../../store/actions';
import {routeEnum, dbEnum} from '../../enums';
import {services} from '../../utils';

class Registration extends Component {
  static propTypes = {
    account: PropTypes.object,
    dispatch: PropTypes.func,
    navigation: PropTypes.shape({navigate: PropTypes.func})
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.realm = services.getRealm();
  }

  saveToDatabase = () => {
    const {account} = this.props;
    const {username} = account.user;
    const {deviceId, hostname} = account;
    const dateCreate = new Date();
    const dateUpdate = new Date();
    const user = {
      ...account.user,
      username,
    };
    const keys = {
      ...account.keys,
      username,
    };
    const resultAccount = {
      username,
      user,
      keys,
      deviceId,
      hostname,
      dateCreate,
      dateUpdate,
    };

    this.realm.write(() => {
      this.realm.create(dbEnum.Account, resultAccount, true);
    });
  };

  loginPassword = (data) => {
    if (!data.login) {
      Alert.alert('Fill login field');
      return false;
    }

    return true;
  };

  registration = async (data) => {
    const {account, dispatch} = this.props;

    if (data.email && this.checkEmail(data.email)) {
      Alert.alert('Invalid email address');

      return null;
    }

    if (account.loading) {
      Alert.alert('Account is loading');

      return null;
    }

    const sendData = {
      name: (data.nickname || '').trim().toLowerCase(),
      email: (data.email || '').trim().toLowerCase(),
      device_id: account.deviceId,
      device_name: account.deviceName,
      platform: account.platform,
      settings: null,
      firstName: (data.firstName || '').trim(),
      secondName: (data.secondName || '').trim(),
    };

    dispatch(accountActions.register(sendData))
      .then(() => {
        Alert.alert('Registration success');
        console.log('registration success', this.props.account);
        this.saveToDatabase();
        this.props.navigation.navigate(routeEnum.Login);
      })
      .catch((error) => {
        Alert.alert('Registration error');
        console.log('registration error', error.response.data);
        if (error.response.status === 400) {
          this.props.navigation.navigate(routeEnum.Login);
        }
      });
  };

  updateSettings = (data) => {

  };

  checkEmail = (value) => {
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
  };

  render() {
    const {hostname, isSecure} = this.props.account;
    const server = `http${isSecure ? 's' : ''}://${hostname}`;

    return (
      <BackgroundLayout background="registration">
        <RegistrationForm context={this.context}
                          account={this.props.account}
                          onLoginPass={this.loginPassword}
                          onRegister={this.registration}
                          onSettings={this.updateSettings}/>
      </BackgroundLayout>
    );
  }
}

export default connect(state => ({
  account: state.account,
}))(Registration);
