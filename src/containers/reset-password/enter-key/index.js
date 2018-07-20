import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Alert} from 'react-native';

import routeEnum from '../../../enums/route-enum';
import {accountActions} from '../../../store/actions';
import {MainLayout, BackgroundLayout, DismissKeyboardLayout} from '../../../components/layouts';
import {ResetPasswordEnterKeyForm} from '../../../components/forms';
import {Loader} from '../../../components/elements';

class ResetPasswordEnterKey extends Component {
  static propTypes = {
    account: PropTypes.object,
    dispatch: PropTypes.func,
    navigation: PropTypes.shape({navigate: PropTypes.func}),
    form: PropTypes.object,
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  onSubmit = async (data) => {
    const {dispatch, navigation} = this.props;
    const emailFormValues = navigation.getParam('data');

    const sendData = {
      token: data.token,
      password: data.password,
    };

    return await dispatch(accountActions.setNewPassword(sendData))
      .then(() => {
        if (this.props.account.setNewPassword) {
          navigation.navigate(routeEnum.ResetPasswordPassSuccess, {email: emailFormValues.email});
          dispatch(accountActions.setDefaultNewPassword());
        } else {
          Alert.alert(this.context.t('OperationNotPerformed'));
        }
        return true;
      })
      .catch((error) => {
        Alert.alert(this.context.t('NoTokenOrUser'));
        return false;
      });
  };

  render() {
    const {account} = this.props;

    return (
      <MainLayout netOffline={!account.net.connected}>
        <BackgroundLayout background="registration" barStyle="light-content">
          <DismissKeyboardLayout>
            <ResetPasswordEnterKeyForm
              context={this.context}
              account={account}
              disabled={!account.net.connected || account.loading}
              onSubmit={() => this.onSubmit(this.props.form.resetPasswordEnterKeyForm.values)}/>
          </DismissKeyboardLayout>
          {account.loading && <Loader/>}
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  account: state.account,
  form: state.form,
}))(ResetPasswordEnterKey);
