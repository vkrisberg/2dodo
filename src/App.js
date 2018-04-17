import React, {Component} from 'react';
import {Provider} from 'react-redux';
import RNLanguages from 'react-native-languages';
import I18n, {setTranslations} from 'redux-i18n'
import translations from './translations'
import store from './store/store';
import http from './utils/http';
import AppWithNavigationState from './router';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.language = RNLanguages.language.substr(0, 2);

    http.init(store);
  }

  componentWillMount() {
    store.dispatch(setTranslations(translations));
  }

  render() {
    return (
      <Provider store={store}>
        <I18n translations={{}} initialLang={this.language} fallbackLang='en' useReducer={true}>
          <AppWithNavigationState/>
        </I18n>
      </Provider>
    );
  }
}
