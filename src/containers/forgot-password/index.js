import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import RNLanguages from 'react-native-languages';
import {connect} from 'react-redux';

import {MainLayout, BackgroundLayout, DismissKeyboardLayout} from '../../components/layouts';
import ForgotPasswordForm from '../../components/forms/forgot-password';
import SuccessMessage from '../../components/forms/forgot-password/success-message';
import routeEnum from '../../enums/route-enum';

class ForgotPassword extends Component {
  static propTypes = {
    account: PropTypes.object,
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  returnToLogin = () => (
    this.props.navigation.navigate(routeEnum.Login)
  );

  render() {
    const {account} = this.props;

    return (
      <MainLayout netOffline={!account.net.connected}>
        <BackgroundLayout background="registration">
          <DismissKeyboardLayout>
            {/*<ForgotPasswordForm context={this.context}  account={account}/>*/}
            <SuccessMessage
              context={this.context}
              email={account.user.email || 'example@yandex.ru'}
              handleToLogin={this.returnToLogin}
              lng={RNLanguages.language.substr(0, 2)}
            />
          </DismissKeyboardLayout>
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  account: state.account,
}))(ForgotPassword);
