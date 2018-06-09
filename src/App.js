import React, {Component} from 'react';
import {NetInfo, Platform, Text} from 'react-native';
import {Provider} from 'react-redux';
import RNDeviceInfo from 'react-native-device-info';
import RNLanguages from 'react-native-languages';
import I18n, {setTranslations} from 'redux-i18n';

import store from './store/store';
import {accountActions} from './store/actions';
import translations from './translations';
import {services} from './utils';
import AppWithNavigationState from './router';

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

  async initApp() {
    const device = {
      deviceId: RNDeviceInfo.getUniqueID(),
      deviceName: RNDeviceInfo.getDeviceName(),
      platform: Platform.OS,
    };
    this.language = RNLanguages.language.substr(0, 2);

    store.dispatch(accountActions.update(device));
    store.dispatch(setTranslations(translations));

    await services.init(store);
  }

  componentDidMount() {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
      store.dispatch(accountActions.netUpdate(connectionInfo));
    });
    NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = (connectionInfo) => {
    console.log('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    store.dispatch(accountActions.netUpdate(connectionInfo));
  };

  render() {
    console.disableYellowBox = true;

    if (!this.state.isAppInit) {
      return null;
    }

    return (
      <Provider store={store}>
        <I18n translations={{}} initialLang={this.language} fallbackLang='en' useReducer={true}>
          <AppWithNavigationState/>
        </I18n>
      </Provider>
    );
  }
}
