import React, {Component} from 'react';
import {Alert, AsyncStorage} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {MainLayout, BackgroundLayout} from '../../components/layouts';
import {RegistrationForm} from '../../components/forms';
import {accountActions} from '../../store/actions';
import {routeEnum, dbEnum} from '../../enums';
import {services} from '../../utils';
import storageEnum from '../../enums/storage-enum';
import CONFIG from '../../config';

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

  componentDidMount() {
    this.imagePickerOptions = {
      title: this.context.t('ChooseYourPhoto'),
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      noData: false,
      allowsEditing: true,
    };
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

  wsConnect = ({deviceId, hostname, user, keys, password}) => {
    services.websocketConnect({
      deviceId,
      hostname,
      username: user.username,
      password,
      hashKey: keys.hashKey,
    });
  };

  registration = async (data) => {
    const {account, dispatch} = this.props;

    if (account.loading) {
      Alert.alert('Account is loading');
      return false;
    }

    const sendData = {
      name: (data.login || '').trim().toLowerCase(),
      password: data.password,
      email: (data.email || '').trim().toLowerCase(),
      phone: (data.phone || '').trim(),
      device_id: account.deviceId,
      device_name: account.deviceName,
      platform: account.platform,
      settings: null,
      server: data.server,
    };

    return await dispatch(accountActions.register(sendData))
      .then((data) => {
        Alert.alert('Registration success');
        console.log('registration success', this.props.account);
        AsyncStorage.setItem(`${CONFIG.storagePrefix}:${storageEnum.username}`, data.username);
        AsyncStorage.setItem(`${CONFIG.storagePrefix}:${storageEnum.password}`, data.password);
        this.saveToDatabase();
        return true;
        // this.props.navigation.navigate(routeEnum.Login);
      })
      .catch((error) => {
        Alert.alert(error.response.data.message);
        console.log('registration error', error.response.status, error.response.data);
        if (error.response.status === 400) {
          // this.props.navigation.navigate(routeEnum.Login);
        }
        return false;
      });
  };

  updateSettings = async (data) => {
    const {account} = this.props;
    const password = await AsyncStorage.getItem(`${CONFIG.storagePrefix}:${storageEnum.password}`);

    // TODO - save firstName, secondName to database

    this.wsConnect({
      deviceId: account.deviceId,
      hostname: account.hostname,
      user: account.user,
      keys: account.keys,
      password,
    });

    this.props.navigation.replace(routeEnum.Messages);
  };

  updateAvatar = () => {
    ImagePicker.showImagePicker(this.imagePickerOptions, (response) => {
      if (response.didCancel) {
      }
      else if (response.error) {
        Alert.alert('Error', response.error);
      }
      else {
        this.props.dispatch(accountActions.updateAvatar(response.data));
      }
    });
  };

  changeTheme = (theme) => {
    this.props.dispatch(accountActions.changeTheme(theme));
  };

  render() {
    const {account} = this.props;

    return (
      <MainLayout netOffline={!account.net.connected}>
        <BackgroundLayout background="registration" barStyle="light-content">
          <RegistrationForm context={this.context}
                            account={account}
                            onRegister={this.registration}
                            onSettings={this.updateSettings}
                            onAvatar={this.updateAvatar}
                            onTheme={this.changeTheme}/>
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  account: state.account,
}))(Registration);
