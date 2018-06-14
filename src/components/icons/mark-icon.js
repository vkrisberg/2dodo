import React, {PureComponent} from 'react';
import {
  Svg,
  G,
  Line
} from 'react-native-svg';

export default class MarkIcon extends PureComponent {
  render() {
    const {color} = this.props;

    return (
      <Svg width="14" height="10">
        <G>
          <Line
            strokeLinecap="round"
            x1="2"
            y1="5"
            x2="6"
            y2="9"
            stroke={color || 'white'}
            strokeWidth="2"
          />
          <Line
            strokeLinecap="round"
            x1="6"
            y1="9"
            x2="12"
            y2="2"
            stroke={color || 'white'}
            strokeWidth="2"
          />
        </G>
      </Svg>
    );
  }
}
