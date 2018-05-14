import React, {Component} from 'react';
import {AsyncStorage, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import PropTypes from 'prop-types';

import MainForm from '../../components/forms/registration/main-form';
import EmailPhoneForm from '../../components/forms/registration/email-phone-form';
import SettingsForm from '../../components/forms/registration/settings-form';
import BackgroundContainer from '../background-container';
import {accountActions} from '../../store/actions';
import routeEnum from '../../enums/route-enum';
import {storageEnum} from '../../enums';
import styles from './styles';
import CONFIG from '../../config';

class Registration extends Component {
  static propTypes = {
    account: PropTypes.object,
    registration: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({navigate: PropTypes.func})
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  state = {
    page: 1,
  };

  nextPage = () => {
    return this.setState({page: this.state.page + 1});
  }

  previousPage = () => {
    return this.setState({page: this.state.page - 1});
  }

  handleSubmit = async (data) => {
    const {account, dispatch} = this.props;

    if (account.loading) {
      return;
    }

    const nickname = data.nickname.toLowerCase() || '';
    const sendData = {
      nickname: data.nickname.toLowerCase() || '',
      name: `${nickname}@${account.hostname}`,
      email: data.email.toLowerCase() || '',
      device_id: account.deviceId,
      device_name: account.deviceName,
      platform: account.platform,
      settings: null,
      fullName: data.fullName || '',
    };

    dispatch(accountActions.register(sendData))
      .then(() => {
        AsyncStorage.setItem(`${CONFIG.storagePrefix}:${storageEnum.keys}`, JSON.stringify(account.keys));
        AsyncStorage.setItem(`${CONFIG.storagePrefix}:${storageEnum.user}`, JSON.stringify(account.user));
        this.props.navigation.navigate(routeEnum.Login);
      })
      .catch((error) => {
        console.log('registration error', error);
      });
  }

  render() {
    const {page} = this.state;

    return (
      <BackgroundContainer>
        {page === 1 && <MainForm onSubmit={this.nextPage}/>}
        {page === 2 && <EmailPhoneForm previousPage={this.previousPage} onSubmit={this.nextPage}/>}
        {page === 3 && <SettingsForm previousPage={this.previousPage} onSubmit={this.handleSubmit}/>}
      </BackgroundContainer>
    );
  }
}

export default connect(state => ({
  account: state.account,
  registration: state.form.registration,
}))(withNavigation(Registration));
