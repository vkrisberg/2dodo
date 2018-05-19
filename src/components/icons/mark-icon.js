import React, { PureComponent } from 'react';
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
          y1="11"
          x2="15"
          y2="15"
          stroke={color || 'white'}
          strokeWidth="2"
        />
        <Line
          strokeLinecap="round"
          x1="15"
          y1="15"
          x2="21"
          y2="8"
          stroke={color || 'white'}
          strokeWidth="2"
        />
      </G>
    );
  }
}