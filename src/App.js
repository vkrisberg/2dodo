import React, {Component} from 'react';
import {PushNotificationIOS, NetInfo, Platform, StatusBar, Alert, AsyncStorage} from 'react-native';
import FCM from "react-native-fcm";
import {Provider} from 'react-redux';
import RNDeviceInfo from 'react-native-device-info';
// import RNLanguages from 'react-native-languages';
import I18n, {setTranslations} from 'redux-i18n';
import SplashScreen from 'react-native-splash-screen';

import store from './store/store';
import {accountActions} from './store/actions';
import translations from './translations';
import {storageEnum} from "./enums";
import {services} from './utils';
import {RootStack} from './router';
import CONFIG from './config';

/**
 * AppState events are set in the Messages/main container.
 */

/**
 * The Push Notification events are set in the Messages/main container.
 */

const KEY_PUSH_TOKEN = `${CONFIG.storagePrefix}:${storageEnum.pushToken}`;

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isAppInit: false,
    };

    this.initApp().then(() => {
      this.setState({
        isAppInit: true,
      });
    });
  }

  componentDidMount() {
    SplashScreen.hide();
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      console.log('initial connection, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
      store.dispatch(accountActions.netUpdate(connectionInfo));
    });
    NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.removeEventListener('register', this.onPushRegistered);
      PushNotificationIOS.removeEventListener('registrationError', this.onPushRegistrationError);
    }
    NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  async initApp() {
    const device = {
      deviceId: RNDeviceInfo.getUniqueID(),
      deviceName: RNDeviceInfo.getDeviceName(),
      deviceModel: RNDeviceInfo.getModel(),
      platform: Platform.OS,
    };
    // TODO - get language from store (no system)
    this.language = 'en'; // RNLanguages.language.substr(0, 2);

    store.dispatch(accountActions.update(device));
    store.dispatch(setTranslations(translations));

    await services.init(store);
    await this.initPushTokens();
  }

  async initPushTokens() {
    // Push notifications for iOS
    if (Platform.OS === 'ios') {
      PushNotificationIOS.addEventListener('register', this.onPushRegistered);
      PushNotificationIOS.addEventListener('registrationError', this.onPushRegistrationError);
      PushNotificationIOS.requestPermissions();
    }

    // Push notifications for Android
    if (Platform.OS === 'android') {
      try {
        let result = await FCM.requestPermissions({badge: true, sound: true, alert: true});
        console.log('FCM.requestPermissions result', result);
      } catch (e) {
        console.error(e);
      }
      FCM.getFCMToken().then(token => {
        console.log('FCM.getFCMToken', token);
        this.setPushToken(token);
      });
    }
  }

  handleConnectivityChange = (connectionInfo) => {
    console.log('connection changed, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    store.dispatch(accountActions.netUpdate(connectionInfo));
  };

  setPushToken = async (token) => {
    const storeToken = await AsyncStorage.getItem(KEY_PUSH_TOKEN);

    if (!storeToken || token !== storeToken) {
      await AsyncStorage.setItem(KEY_PUSH_TOKEN, token);
    }
  };

  onPushRegistered = (token) => {
    console.log('NOTIFICATION TOKEN:', token);

    if (!token) {
      return;
    }

    this.setPushToken(token);
  };

  onPushRegistrationError = (error) => {
    console.log('NOTIFICATION ERROR:', error);

    if (!error) {
      return;
    }

    Alert.alert(
      'Failed To Register For Remote Push',
      `Error (${error.code}): ${error.message}`,
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  };

  render() {
    console.disableYellowBox = true;

    if (!this.state.isAppInit) {
      return null;
    }

    return (
      <Provider store={store}>
        <I18n translations={{}} initialLang={this.language} fallbackLang="en" useReducer={true}>
          <StatusBar
            backgroundColor="#62a3ff"
            barStyle="light-content"
          />
          <RootStack/>
        </I18n>
      </Provider>
    );
  }
}
