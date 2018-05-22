import React, {Component} from 'react';
import {
  addNavigationHelpers,
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
  Messages
} from './containers';

const MainStack = StackNavigator({
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
  }
}, {
  initialRouteName: 'Contacts',
  gesturesEnabled: true,
  drawerLockMode: 'locked-closed',
  navigationOptions: {
    header:false,
    headerBackTitle: null
  }
});


export const AppNavigator = DrawerNavigator({
  MainStack: {
    screen: MainStack,
  },
});

class AppWithNavigationState extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  };

  render() {
    const {dispatch, nav} = this.props;

    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch,
          state: nav,
          addListener,
        })}
      />
    );
  }
}

export default connect(state => ({
  nav: state.nav,
}))(AppWithNavigationState);

