import React, { PureComponent } from 'react';
import { Svg, G, Circle, Line } from 'react-native-svg';

export default class Icon extends PureComponent {
  getMark = () => (
    <G>
      <Line
        strokeLinecap="round"
        x1="11"
        y1="11"
        x2="15"
        y2="15"
        stroke="white"
        strokeWidth="2"
      />
      <Line
        strokeLinecap="round"
        x1="15"
        y1="15"
        x2="21"
        y2="8"
        stroke="white"
        strokeWidth="2"
      />
    </G>
  )

  render() {
    const { checked } = this.props;

    return (
      <Svg height="30" width="30">
        <G>
          <Circle
            cx="16"
            cy="12"
            r="11"
            stroke={checked ? "#62a3ff" : 'black'}
            strokeWidth="2"
            fill={checked ? '#62a3ff': 'white'}
          />
        </G>
        {checked && this.getMark()}
        
      </Svg>
    );
  }
}