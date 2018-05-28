import React, {PureComponent} from 'react';
import {Svg, Path} from 'react-native-svg';

export default class ArrowIcon extends PureComponent {
  render() {
    return (
      <Svg width="12" height="20">
        <Path
          fill="rgb(106, 118, 134)"
          d="M11.237,2.360 L3.463,10.131 L11.027,17.692 C11.459,18.123 11.459,18.822 11.027,19.253 C10.596,19.684
          9.897,19.684 9.466,19.253 L1.069,10.859 C0.637,10.429 0.637,9.730 1.069,9.299 C1.179,9.188 1.308,9.108
          1.444,9.054 L9.690,0.813 C10.117,0.386 10.810,0.386 11.237,0.813 C11.665,1.240 11.665,1.933 11.237,2.360 Z"
        />
      </Svg>
    );
  }
}