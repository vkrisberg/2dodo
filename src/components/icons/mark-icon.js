import React, {PureComponent} from 'react';
import {
  G,
  Line
} from 'react-native-svg';

export default class MarkIcon extends PureComponent {
  render() {
    const {color} = this.props;

    return (
      <G>
        <Line
          strokeLinecap="round"
          x1="11"
          y1="12"
          x2="15"
          y2="16"
          stroke={color || 'white'}
          strokeWidth="2"
        />
        <Line
          strokeLinecap="round"
          x1="15"
          y1="16"
          x2="21"
          y2="9"
          stroke={color || 'white'}
          strokeWidth="2"
        />
      </G>
    );
  }
}
