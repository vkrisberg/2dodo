import React, {PureComponent} from 'react';
import {G, Path} from 'react-native-svg';

import {CircleIcon} from './index';

export default class VideoIcon extends PureComponent {
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
        <G width="19" height="21" x="17" y="14.5">
          <Path
            strokeWidth="2"
            fill="white"
            stroke="rgb(164, 167, 174)"
            d="M6.351,5.483 L12.069,8.793 C13.541,9.575 14.057,11.384 12.069,12.655 L6.351,15.966 C5.649,15.966
            5.080,15.389 5.080,14.678 L5.080,6.770 C5.080,6.059 5.649,5.483 6.351,5.483 Z"
          />
        </G>
      </CircleIcon>
    );
  }
}