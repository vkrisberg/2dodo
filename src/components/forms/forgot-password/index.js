import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { withNavigation } from 'react-navigation';

import Input from '../../elements/input';
import Button from '../../elements/button';
import account from '../../../api/account';
import routeEnum from '../../../enums/route-enum';
import validate from './validate';

class ForgotPasswordForm extends Component {

  handleRestorePassword = ({ email }) => {
    this.props.navigation.navigate(routeEnum.PasswordApprove, { email });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <View>
        <Field style={{marginBottom: 30}} placeholder="example@yandex.ru" component={Input} name="email"  />
        <Button onPress={handleSubmit(this.handleRestorePassword)}>Восстановить</Button>
      </View>
    );
  }
}

export default reduxForm({
  form: 'forgotPassword',
  // validate
})(withNavigation(ForgotPasswordForm));