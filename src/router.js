import React, {Component} from 'react';
import {
  StackNavigator,
  DrawerNavigator
} from 'react-navigation';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addListener} from './utils/redux';

import {
  Main,
  Login,
  Registration,
  ForgotPassword,
  Contacts,
  Preload,
  Events,
  PasswordApprove,
  Settings,
  Groups,
  Favorits,
  Messages,
  PrivateChat,
} from './containers';

export const MainStack = StackNavigator({
  Main: {
    screen: Main,
  },
  Login: {
    screen: Login,
  },
  Registration: {
    screen: Registration
  },
  ForgotPassword: {
    screen: ForgotPassword
  },
  Contacts: {
    screen: Contacts
  },
  Events: {
    screen: Events
  },
  Preload: {
    screen: Preload
  },
  PasswordApprove: {
    screen: PasswordApprove
  },
  Settings: {
    screen: Settings
  },
  Messages: {
    screen: Messages
  },
  Groups: {
    screen: Groups
  },
  Favorits: {
    screen: Favorits
  },
  PrivateChat: {
    screen: PrivateChat
  }
}, {
  headerMode: 'none',
  initialRouteName: 'Preload',
  gesturesEnabled: false,
  drawerLockMode: 'locked-closed',
  navigationOptions: {
    header:false,
    headerBackTitle: null
  }
});


class AppWithNavigationState extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  };

  render() {
    const {dispatch, nav} = this.props;

    return (
      <MainStack
        // navigation={{
        //   dispatch,
        //   state: nav,
        //   addListener,
        // }}
      />
    );
  }
}

export default connect(state => ({
  nav: state.nav,
}))(AppWithNavigationState);

