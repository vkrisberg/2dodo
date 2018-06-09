import React, {PureComponent} from 'react';
import {ScrollView} from 'react-native';
import PropTypes from 'prop-types';

import RegistrationLoginForm from './login-form';
import RegistrationEmailForm from './email-form';
import RegistrationSettingsForm from './settings-form';
import {sizes} from '../../../styles';

export default class RegistrationForm extends PureComponent {

  static propTypes = {
    context: PropTypes.object,
    account: PropTypes.object,
    onLoginPass: PropTypes.func,
    onRegister: PropTypes.func,
    onSettings: PropTypes.func,
  };

  state = {
    page: 0,
  };

  onScrollEnd = (event) => {
    const xOffset = event.nativeEvent.contentOffset.x;

    this.setState({
      page: Math.floor(xOffset / sizes.windowWidth),
    });
  };

  render() {
    const {context, account, onLoginPass, onRegister, onSettings} = this.props;
    const {theme} = account.user;

    return (
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={0}
        onMomentumScrollEnd={this.onScrollEnd}>

        <RegistrationLoginForm theme={theme}
                               context={context}
                               defaultServer={account.hostname}/>
        <RegistrationEmailForm/>
        <RegistrationSettingsForm/>

      </ScrollView>
    );
  }
}
