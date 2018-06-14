import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { reduxForm } from 'redux-form';
import { withNavigation } from 'react-navigation';

import account from '../../../api/account';
import routeEnum from '../../../enums/route-enum';
import ForgotPassEmailForm from './email-form';

class ForgotPasswordForm extends Component {

  static propTypes = {
    context: PropTypes.object,
    account: PropTypes.object,
  };

  handleRestorePassword = ({ email }) => {
    this.props.navigation.navigate(routeEnum.PasswordApprove, { email });
  };

  render() {
    const { handleSubmit, context, account } = this.props;
    const {theme} = account.user;

    return (
      <View>
        <ForgotPassEmailForm theme={theme} context={context}/>
      </View>
    );
  }
}

export default reduxForm({
  form: 'forgotPassword',
  // validate
})(withNavigation(ForgotPasswordForm));