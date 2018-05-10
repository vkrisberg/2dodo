import React, {Component} from 'react';
import {addNavigationHelpers, StackNavigator, DrawerNavigator} from 'react-navigation';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addListener} from './utils/redux';

import Main from './containers/main';
import Login from './containers/login';
import Registration from './containers/registration';
import ForgotPassword from './containers/forgot-password';
import Contacts from './containers/contacts';
import Events from './containers/events';
import Preload from './containers/preload';
import PasswordApprove from './containers/password-approve';


let MyTransition = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0.8, 1, 1],
  });

  const scaleY = position.interpolate({
    inputRange,
    outputRange: ([0.8, 1, 1]),
  });

  return {
    opacity,
    transform: [
      {scaleY}
    ]
  };
};

let TransitionConfiguration = () => {
  return {
    // Define scene interpolation, eq. custom transition
    screenInterpolator: (sceneProps) => {
      const {position, scene} = sceneProps;
      const {index, route} = scene;
      const params = route.params || {}; // <- That's new
      const transition = params.transition || 'default'; // <- That's new

      return {
        default: MyTransition(index, position),
      }[transition];
    }
  };
};

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
  }
}, {
  initialRouteName: 'Login',
  gesturesEnabled: true,
  drawerLockMode: 'locked-closed',
  navigationOptions: {
    header:false,
    headerBackTitle: null,
  },
  transitionConfig: TransitionConfiguration
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

