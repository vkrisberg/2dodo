import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Tabs from './tab-navigator';
import {
  Login,
  Registration,
  ForgotPassword,
  Preload,
  Events,
} from './containers';
import {ContactAdd} from './containers/contacts';
import {ChatCreate, ChatMessage} from './containers/messages';

export const MainStack = createStackNavigator({
  Login: {
    screen: Login,
  },
  Registration: {
    screen: Registration,
  },
  ForgotPassword: {
    screen: ForgotPassword,
  },
  Messages: {
    screen: Tabs,
  },
  Events: {
    screen: Events,
  },
  Preload: {
    screen: Preload,
  },
  ContactAdd: {
    screen: ContactAdd,
  },
  ChatCreate: {
    screen: ChatCreate,
  },
  ChatMessage: {
    screen: ChatMessage,
  },
}, {
  headerMode: 'none',
  initialRouteName: 'Preload',
  gesturesEnabled: false,
  drawerLockMode: 'locked-closed',
  navigationOptions: {
    header: false,
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

