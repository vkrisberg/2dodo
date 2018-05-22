import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import PropTypes from 'prop-types';
import Realm from 'realm';

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

  saveToDatabase = () => {
    const {username} = this.props.account.user;
    const {deviceId, hostname} = this.props.account;
    const dateCreate = new Date();
    const dateUpdate = new Date();
    const user = {
      ...this.props.account.user,
      username,
    };
    const keys = {
      ...this.props.account.keys,
      username,
    };
    const account = {
      username,
      user,
      keys,
      deviceId,
      hostname,
      dateCreate,
      dateUpdate,
    };
    Realm.open(CONFIG.realmConfig)
      .then((realm) => {
        realm.write(() => {
          realm.create('Account', account, true);
        });
        realm.close();
      })
      .catch((error) => {
        console.log('Registration: realm error', error);
      });
  }

  registration = async (data) => {
    const {account, dispatch} = this.props;

    if (account.loading) {
      return;
    }

    const sendData = {
      name: (data.nickname || '').toLowerCase(),
      email: (data.email || '').toLowerCase(),
      device_id: account.deviceId,
      device_name: account.deviceName,
      platform: account.platform,
      settings: null,
      firstName: data.firstName,
      secondName: data.secondName,
    };

    dispatch(accountActions.register(sendData))
      .then(() => {
        console.log('registration success', this.props.account);
        this.saveToDatabase();
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
    const {hostname, isSecure} = this.props.account;
    const server = `http${isSecure ? 's' : ''}://${hostname}`;

    return (
      <BackgroundContainer image={backgroundImage}>
        {page === 1 && <MainForm defaultServer={server} onSubmit={this.nextPage}/>}
        {page === 2 && <EmailPhoneForm previousPage={this.previousPage} onSubmit={this.nextPage}/>}
        {page === 3 && <SettingsForm previousPage={this.previousPage} onSubmit={this.registration}/>}
      </BackgroundContainer>
    );
  }
}

export default connect(state => ({
  account: state.account,
}))(withNavigation(Registration));
