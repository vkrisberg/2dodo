import React, {Component} from 'react';
import {Alert} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {MainLayout, BackgroundLayout, DismissKeyboardLayout} from '../../components/layouts';
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
      return false;
    }

    if (account.loading) {
      Alert.alert('Account is loading');
      return false;
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

    return await dispatch(accountActions.register(sendData))
      .then(() => {
        Alert.alert('Registration success');
        console.log('registration success', this.props.account);
        this.saveToDatabase();
        return true;
        // this.props.navigation.navigate(routeEnum.Login);
      })
      .catch((error) => {
        Alert.alert('Registration error');
        console.log('registration error', error.response.data);
        if (error.response.status === 400) {
          // this.props.navigation.navigate(routeEnum.Login);
        }
        return false;
      });
  };

  updateSettings = (data) => {

  };

  updateAvatar = () => {
    ImagePicker.showImagePicker(this.imagePickerOptions, (response) => {
      if (response.didCancel) {
      }
      else if (response.error) {
        Alert.alert('Error', response.error);
      }
      else {
        /* Upload avatar to server */
        this.props.dispatch(accountActions.updateAvatar(response.data));
        // const fileExt = response.uri.substr(-4, 4);
        // const file = {uri: response.uri, name: this.props.user.id + '_avatar' + fileExt.toLowerCase(), type: 'multipart/form-data'};
        //
        // this.props.dispatch(
        //   accountActions.saveAvatar(this.props.user.id, file,
        //     (uri) => {
        //       this.props.dispatch(
        //         accountActions.saveUserSettings({
        //           ...this.state.user,
        //           avatar: uri
        //         })
        //       );
        //       this.props.navigator.setTabIcons({
        //         tabIndex: global.tabIds.profile,
        //         remoteIcon: {uri, width: 50, height: 50, scale: 2, radius: 25}
        //       });
        //     }
        //   )
        // );
      }
    });
  };

  changeTheme = (theme) => {
    this.props.dispatch(accountActions.changeTheme(theme));
  };

  checkEmail = (value) => {
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
  };

  render() {
    const {account} = this.props;

    return (
      <MainLayout netOffline={!account.net.connected}>
        <BackgroundLayout background="registration">
          <RegistrationForm context={this.context}
                            account={account}
                            onLoginPass={this.loginPassword}
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
