import React, {Component} from 'react';
import {addNavigationHelpers, StackNavigator, DrawerNavigator} from 'react-navigation';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addListener} from './utils/redux';

import {DrawerButton} from './components/elements';
import Main from './containers/main';
import Login from './containers/login';

const MainStack = StackNavigator({
  Main: {
    screen: Main,
    navigationOptions: ({navigation}) => ({
      title: '2dodo',
      headerLeft: <DrawerButton onPress={() => {
        navigation.navigate('DrawerOpen')
      }}/>,
      drawerLockMode: 'unlocked',
    }),
  },
  Login: {
    screen: Login,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.title,
    }),
  },
}, {
  initialRouteName: 'Main',
  gesturesEnabled: true,
  drawerLockMode: 'locked-closed',
  navigationOptions: {
    headerBackTitle: null,
  },
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

