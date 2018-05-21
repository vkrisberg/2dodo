import React, {Component} from 'react';
import {Platform} from 'react-native';
import {Provider} from 'react-redux';
import RNDeviceInfo from 'react-native-device-info';
import RNLanguages from 'react-native-languages';
import I18n, {setTranslations} from 'redux-i18n';
import Realm from 'realm';

import {accountActions} from './store/actions';
import translations from './translations';
import store from './store/store';
import http from './utils/http';
import AppWithNavigationState from './router';
import CONFIG from './config';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.initDatabase();
    this.initApp();
    http.init(store);
  }

  initDatabase() {
    Realm.open(CONFIG.realmConfig)
      .then((realm) => {
        console.log('realm success');
        realm.close();
      })
      .catch((error) => {
        console.log('realm error', error);
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
  }

  render() {
    console.disableYellowBox = true;

    return (
      <Provider store={store}>
        <I18n translations={{}} initialLang={this.language} fallbackLang='en' useReducer={true}>
          <AppWithNavigationState/>
        </I18n>
      </Provider>
    );
  }
}
