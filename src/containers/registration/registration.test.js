import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer }  from 'redux-form';

import Registration from './';

const store = createStore(combineReducers({ form: formReducer }));
const registration = renderer.create(
  <Provider store={store}>
    <Registration />
  </Provider>
);

describe('<Registration />', () => {
  it('renders without crashing', () => {
    expect(registration.toJSON()).toBeTruthy();
  });

  it('show one of forms when rendered', () => {
    expect(registration.toJSON().children.length).toEqual(1);
  });

  it('change state.page when click on Button component', () => {
    const registrationInnerComponent = registration.root.findByType(Registration)._fiber.stateNode;

    registrationInnerComponent.nextPage();

    expect(registrationInnerComponent.state.page).toBeGreaterThan(1);

    registrationInnerComponent.previousPage();

    expect(registrationInnerComponent.state.page).toEqual(1);
  });
});