import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import routeEnum from '../../../enums/route-enum';
import {accountActions} from '../../../store/actions';
import {MainLayout, BackgroundLayout, DismissKeyboardLayout} from '../../../components/layouts';
import {ResetPasswordEmailForm} from '../../../components/forms';

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

  onSubmit = async (email) => {
    const {dispatch} = this.props;

    return await dispatch(accountActions.resetPassword(email))
      .then((email) => {
        if (this.props.account.resetPassword) {
          this.props.navigation.navigate(routeEnum.ResetPasswordEnterKey);
          dispatch(accountActions.setDefaultResetPassword());
        } else {
          alert('failed');
        }
        return true;
      })
      .catch((error) => {
        alert(`fail reset password, error - ${error}`);
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
              onSubmit={() => this.onSubmit(this.props.form.resetPasswordEmailForm.values.email)}
              disabled={!account.net.connected}/>
          </DismissKeyboardLayout>
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  account: state.account,
  form: state.form,
}))(ResetPassword);
