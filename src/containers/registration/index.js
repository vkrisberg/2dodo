import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
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
import CONFIG from '../../config';
import backgroundImage from './img/background.png';

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

    const nickname = (data.nickname || '').toLowerCase();
    const sendData = {
      nickname,
      name: `${nickname}@${account.hostname}`,
      email: (data.email || '').toLowerCase(),
      device_id: account.deviceId,
      device_name: account.deviceName,
      platform: account.platform,
      settings: null,
      fullName: data.fullName || '',
    };

    dispatch(accountActions.register(sendData))
      .then(() => {
        console.log('registration success', this.props.account);
        AsyncStorage.setItem(`${CONFIG.storagePrefix}:${storageEnum.keys}`, JSON.stringify(this.props.account.keys));
        AsyncStorage.setItem(`${CONFIG.storagePrefix}:${storageEnum.user}`, JSON.stringify(this.props.account.user));
        this.props.navigation.navigate(routeEnum.Login);
      })
      .catch((error) => {
        console.log('registration error', error.response.data);
        if (error.response.status === 400) {
          this.props.navigation.navigate(routeEnum.Login);
        }
      });
  }

  render() {
    const {page} = this.state;

    return (
      <BackgroundContainer image={backgroundImage}>
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
