import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer, formValueSelector, Field }  from 'redux-form';

import MainForm from './';
import Button from '../../../elements/button';
import Checkbox from '../../../elements/checkbox';

const store = createStore(combineReducers({ form: formReducer }));
const mainForm = renderer.create(
  <Provider store={store}>
    <MainForm />
  </Provider>
);

const mainFormInstance = mainForm.getInstance();

describe('<MainForm />', () => {
  it('renders without crashing', () => {
    expect(mainForm.toJSON()).toBeTruthy();
  });

  it('contains 3 required <Field /> components', () => {
    expect(mainForm.root.findAllByType(Field).length).toEqual(3);
  });

  it('contains one <Checkbox /> component', () => {
    expect(mainForm.root.findAllByType(Checkbox).length).toEqual(1);
  });

  it('contains one <Button /> component', () => {
    expect(mainForm.root.findAllByType(Button).length).toEqual(1);
  });

  it('show server input when press checkbox', () => {
    const checkbox = mainForm.root.findByType(Checkbox);
    const pageComponent = mainForm.root.findByType(MainForm);

    checkbox.props.onCheck();
    // expect(registrationInstance;
  });
});
