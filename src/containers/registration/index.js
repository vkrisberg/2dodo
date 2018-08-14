import React, {Component} from 'react';
import {Alert, AsyncStorage} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {MainLayout, BackgroundLayout} from '../../components/layouts';
import {RegistrationForm} from '../../components/forms';
import {accountActions} from '../../store/actions';
import {dbEnum, routeEnum} from '../../enums';
import {helpers, services} from '../../utils';
import storageEnum from '../../enums/storage-enum';
import CONFIG from '../../config';

const goToMessagesAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({routeName: routeEnum.Messages})],
});

class Registration extends Component {
  static propTypes = {
    account: PropTypes.object,
    form: PropTypes.object,
    dispatch: PropTypes.func,
    navigation: PropTypes.shape({navigate: PropTypes.func}),
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  state = {
    connecting: false,
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

  saveToDatabase = async () => {
    const {account} = this.props;
    const {username} = account.user;
    const {deviceId, hostname, pushToken} = account;
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
      pushToken,
      dateCreate,
      dateUpdate,
    };

    // each user his own database
    const realmPath = helpers.getRealmPath(username);
    this.realm = await services.realmInit(realmPath);

    this.realm.write(() => {
      this.realm.create(dbEnum.Account, resultAccount, true);
    });
  };

  registration = async (data) => {
    const {context} = this;
    const {account, dispatch} = this.props;

    if (account.loading) {
      Alert.alert(context.t('RegistrationProgress'));
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
        Alert.alert(context.t('RegistrationSuccess'));
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
        return false;
      });
  };

  updateSettings = async (data) => {
    const {context} = this;
    const {account} = this.props;
    const {firstName, secondName, avatar} = data;
    const password = await AsyncStorage.getItem(`${CONFIG.storagePrefix}:${storageEnum.password}`);

    this.setState({
      connecting: true,
    });

    this.props.dispatch(accountActions.updateProfile({firstName, secondName, avatar})).then((user) => {
      this.props.dispatch(accountActions.connect({
        deviceId: account.deviceId,
        hostname: account.hostname,
        keys: account.keys,
        user,
        password,
      })).then(() => {
        setTimeout(() => {
          this.props.navigation.dispatch(goToMessagesAction);
        }, 2000);
      }).catch((error) => {
        console.log('login error', error);
        this.setState({
          connecting: false,
        });
        Alert.alert(context.t('LoginAuthError'));
      });
    }, (error) => {
      Alert.alert(error.toString());
    });
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

  updateTheme = (theme) => {
    this.props.dispatch(accountActions.updateTheme(theme));
  };

  render() {
    const {account, form} = this.props;
    const formSettings = form.settings;

    return (
      <MainLayout netOffline={!account.net.connected}>
        <BackgroundLayout background="registration" barStyle="light-content">
          <RegistrationForm context={this.context}
                            account={account}
                            connecting={this.state.connecting}
                            onRegister={this.registration}
                            onSettings={() => this.updateSettings({
                              firstName: formSettings.values.firstName,
                              secondName: formSettings.values.secondName,
                              avatar: formSettings.values.avatar}
                            )}
                            onAvatar={this.updateAvatar}
                            onTheme={this.updateTheme}/>
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  account: state.account,
  form: state.form,
}))(Registration);
