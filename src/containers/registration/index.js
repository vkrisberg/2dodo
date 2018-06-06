import React, {Component} from 'react';
import {Alert, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import PropTypes from 'prop-types';

import {BackgroundLayout, DismissKeyboardLayout} from '../../components/layouts';
import MainForm from '../../components/forms/registration/main-form';
import EmailPhoneForm from '../../components/forms/registration/email-phone-form';
import {accountActions} from '../../store/actions';
import {services} from '../../utils';
import routeEnum from '../../enums/route-enum';
import {dbEnum} from '../../enums';
import backgroundImage from './img/bg.png';
import {LoginStyles} from '../login/styles';

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

  constructor(props) {
    super(props);
    this.realm = services.getRealm();
  }

  nextPage = (data) => {
    return data.nickname
      ? this.setState({page: this.state.page + 1})
      : Alert.alert('Fill nickname field');
  };

  previousPage = () => {
    return this.setState({page: this.state.page - 1});
  };

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
      firstName: data.firstName,
      secondName: data.secondName,
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

  checkEmail = (value) => {
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
  }

  render() {
    const {page} = this.state;
    const {hostname, isSecure} = this.props.account;
    const server = `http${isSecure ? 's' : ''}://${hostname}`;

    return (
      <BackgroundLayout image={backgroundImage}>
        <DismissKeyboardLayout>
        {page === 1 && <MainForm defaultServer={server} onSubmit={this.nextPage}/>}
        {page === 2 && <EmailPhoneForm previousPage={this.previousPage} onSubmit={this.registration}/>}
        </DismissKeyboardLayout>
      </BackgroundLayout>
    );
  }
}

export default connect(state => ({
  account: state.account,
}))(withNavigation(Registration));
