import React from 'react';
import renderer from 'react-test-renderer';
import { TextInput } from 'react-native';
import { Field } from 'redux-form';

import Input from './';

const input = renderer.create(<Field component={Input} placeholder="Текст внутри инпута" />);
const treeInput = input.toTree();
const textInput = input.root.findByType(TextInput);
const inputInstance = input.getInstance();

describe('<Input />', () => {
  it('renders without crashing', () => {
    expect(input.toJSON()).toBeTruthy();
  });

  it('contains placeholder from "props.placeholder"', () => {
    const { placeholder } = treeInput.props;
    const textInputPlaceholder = textInput.props.placeholder;

    expect(textInputPlaceholder === placeholder).toBe(true);
  });

  it('change focus when pressed', () => {
    inputInstance.handleFocus();
    
    expect(inputInstance.state.focused).toBe(true);
  });

  it('change value when typing text', () => {
    const textMock = 'text mock';

    inputInstance.handleChangeText(textMock);

    expect(textInput.props.value).toEqual(inputInstance.state.text);
  });
});