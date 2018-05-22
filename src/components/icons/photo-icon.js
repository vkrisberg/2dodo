import React, {PureComponent} from 'react';
import {G, Path, Circle} from 'react-native-svg';

import {CircleIcon} from './index';

export default class PhotoIcon extends PureComponent {
  render() {
    return (
      <CircleIcon>
        <G width="36" height="35" x="8" y="8">
          <Path
            strokeWidth="2"
            stroke="#a4a7ae"
            fill="white"
            d="M18.088,5.310 C25.466,5.310 30.232,10.074 30.232,17.448 C30.232,24.822 25.466,29.586 18.088,29.586
            C10.710,29.586 5.944,24.822 5.944,17.448 C5.944,10.074 10.710,5.310 18.088,5.310 Z"
          />
        </G>
        <G x="24" y="16">
          <Circle r="2.5" cx="5" cy="5" fill="#a4a7ae" />
        </G>
        <G width="10" height="8" x="15" y="25">
          <Path
            fill="rgb(164, 167, 174)"
            d="M1.613,7.820 L0.785,6.387 L8.763,0.042 L9.591,1.475 L1.613,7.820 Z"
          />
        </G>
        <G width="6" height="8" x="23" y="25">
          <Path
            fill="rgb(164, 167, 174)"
            d="M5.898,6.500 L4.727,7.671 L0.070,1.913 L1.241,0.743 L5.898,6.500 Z"
          />
        </G>
        <G width="18" height="15" x="21" y="24">
          <Path
            fill="rgb(164, 167, 174)"
            d="M1.133,14.234 L0.305,12.801 L16.563,0.387 L17.391,1.820 L1.133,14.234 Z"
          />
        </G>
      </CircleIcon>
    );
  }
}