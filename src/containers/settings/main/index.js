import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {MainLayout, BackgroundLayout} from '../../../components/layouts';
import {Navbar, NavbarDots, ButtonNavbar} from '../../../components/elements';
import {accountActions} from '../../../store/actions';

class Settings extends Component {
  static propTypes = {
    account: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({navigate: PropTypes.func}),
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  logout = () => {
    this.props.dispatch(accountActions.logout());
  };

  renderNavbarButton = () => {
    return (
      <ButtonNavbar position="right" onPress={this.logout}>{this.context.t('Logout')}</ButtonNavbar>
    );
  };

  render() {
    const {account} = this.props;
    const {theme} = account.user;

    return (
      <MainLayout netOffline={!account.net.connected}>
        <BackgroundLayout theme={theme} paddingHorizontal={10}>
          <Navbar renderTitle={this.context.t('Settings')}
                  renderLeft={<NavbarDots/>}
                  renderRight={this.renderNavbarButton()}/>
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  account: state.account,
}))(Settings);
