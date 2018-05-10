import React from 'react';
import renderer from 'react-test-renderer';
import { Text } from 'react-native';

import Checkbox from './';
let checkbox, checkboxInstance;

beforeEach(() => {
  checkbox = renderer.create(<Checkbox onCheck={handleCheck} label={initialState.label} textAlign="right" />);
  checkboxInstance = checkbox.getInstance();
});

const initialState = {
  label: 'text near checkbox',
  componentIsVisible: false
};

const restoreState = () => {
  initialState.componentIsVisible = false;
};

const handleCheck = () => {
  initialState.componentIsVisible = !initialState.componentIsVisible;
};

describe('<Checkbox />', () => {
  it('renders without crashing', () => {
    expect(checkbox.toJSON()).toBeTruthy();
  });

  it('change state.checked when pressed', () => {
    let checked = checkboxInstance.state.checked;

    checkboxInstance.handlePress();

    expect(checked !== checkboxInstance.state.checked).toBe(true);

    restoreState();
  });

  it('can change other elements state when checked/unchecked', () => {
    checkboxInstance.handlePress();

    expect(initialState.componentIsVisible).toBe(true);
    
    checkboxInstance.handlePress();

    expect(initialState.componentIsVisible).toBe(false);

    restoreState();
  });

  it('contains text from props.label', () => {
    const textComponent = checkbox.root.findByType(Text);

    expect(textComponent.props.children).toEqual(initialState.label);
  });

  it('can render text in different sides with props.textAlign', () => {
    const textComponent =  checkbox.root.findByType(Text);

    expect(textComponent.props.isRight).toBe(true);
  });
});