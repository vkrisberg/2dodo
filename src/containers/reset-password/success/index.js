import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RNLanguages from 'react-native-languages';
import {connect} from 'react-redux';

import routeEnum from '../../../enums/route-enum';
import {MainLayout, BackgroundLayout, DismissKeyboardLayout} from '../../../components/layouts';
import {SuccessMessage} from '../../../components/forms';

class ResetPasswordPassSuccess extends Component {
  static propTypes = {
    account: PropTypes.object,
    navigation: PropTypes.shape({navigate: PropTypes.func}),
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
        <BackgroundLayout background="registration" barStyle="light-content">
          <DismissKeyboardLayout>
            <SuccessMessage
              context={this.context}
              email={account.user.email || 'example@yandex.ru'}
              handleToLogin={this.returnToLogin}
              lng={RNLanguages.language.substr(0, 2)}/>
          </DismissKeyboardLayout>
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  account: state.account,
}))(ResetPasswordPassSuccess);
