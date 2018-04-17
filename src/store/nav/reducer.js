import {AppNavigator} from '../../router';

const initialRouteName = 'MainStack';

const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams(initialRouteName)
);

// Remove multiple initial routes
const route = initialState.routes[0].routes.find(r => r.routeName === initialRouteName);
while (route.routes.length !== 1) {
  route.routes.pop();
  route.index--;
}

const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

export default navReducer;
