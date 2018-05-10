import React from 'react';
import renderer from 'react-test-renderer';
import { Text, View } from 'react-native';

import Button from './';

const mockFunction = jest.fn();

const button = renderer.create(<Button title="123" onPress={mockFunction}>1234</Button>);
const jsonButton = button.toJSON();
const treeButton = button.toTree();

describe('<Button />', () => {
  it('renders without crashing', () => {
    expect(jsonButton).toBeTruthy();
  });

  it('contains text from children or title props', () => {
    const text = button.root.findByType(Text).props.children;
    const { title, children } = treeButton.props;

    expect(text === children || text === title).toBe(true);
  });

  it('should call "props.onPress" when an <View> is pressed', () => {
    const view = button.root.findByType(View);

    view.props.onPress();

    expect(mockFunction).toHaveBeenCalled();
  });
});
