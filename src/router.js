import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {addListener} from './utils/redux';
import Tabs from './tab-navigator';
import {
  Main,
  Login,
  Registration,
  ForgotPassword,
  Preload,
  Events,
  PasswordApprove
} from './containers';
import {AddContact} from './containers/contacts';


export const MainStack = createStackNavigator({
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
  Messages: {
    screen: Tabs
  },
  AddContact: {
    screen: AddContact
  },
  Events: {
    screen: Events
  },
  Preload: {
    screen: Preload
  },
  PasswordApprove: {
    screen: PasswordApprove
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

