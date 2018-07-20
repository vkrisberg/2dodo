import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Alert} from 'react-native';

import routeEnum from '../../../enums/route-enum';
import {accountActions} from '../../../store/actions';
import {MainLayout, BackgroundLayout, DismissKeyboardLayout} from '../../../components/layouts';
import {ResetPasswordEmailForm} from '../../../components/forms';
import {Loader} from '../../../components/elements';

class ResetPassword extends Component {
  static propTypes = {
    account: PropTypes.object,
    dispatch: PropTypes.func,
    navigation: PropTypes.shape({navigate: PropTypes.func}),
    form: PropTypes.object,
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  onSubmit = async (formValues) => {
    const email = (formValues.email || '').trim().toLowerCase();
    const username = (formValues.login || '').trim().toLowerCase();
    const {dispatch} = this.props;

    return await dispatch(accountActions.resetPassword(email, username))
      .then(() => {
        if (this.props.account.resetPassword) {
          this.props.navigation.navigate(routeEnum.ResetPasswordEnterKey, {data: {email, username}});
          dispatch(accountActions.setDefaultResetPassword());
        } else {
          Alert.alert(this.context.t('OperationNotPerformed'));
        }
        return true;
      })
      .catch((error) => {
        Alert.alert(this.context.t('NoEmailExist'));
        return false;
      });
  };

  render() {
    const {account} = this.props;

    return (
      <MainLayout netOffline={!account.net.connected}>
        <BackgroundLayout background="registration" barStyle="light-content">
          <DismissKeyboardLayout>
            <ResetPasswordEmailForm
              context={this.context}
              account={account}
              onSubmit={() => this.onSubmit(this.props.form.resetPasswordEmailForm.values)}
              disabled={!account.net.connected || account.loading}/>
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
}))(ResetPassword);
