import React, { PureComponent } from 'react';
import {Svg, Path} from 'react-native-svg';

export default class Icon extends PureComponent {
  render() {
    return (
      <Svg width="6" height="10">
        <Path
          fill={this.props.color || 'white'}
          d="M4.910,5.494
          L1.006,9.395
          C0.791,9.610
          0.441,9.610
          0.226,9.395
          C0.010,9.179
          0.010,8.830
          0.226,8.615
          L3.739,5.103
          L0.226,1.592
          C0.010,1.377
          0.010,1.027
          0.226,0.812
          C0.441,0.597
          0.791,0.597
          1.006,0.812
          L4.910,4.713
          C5.125,4.929
          5.125,5.278
          4.910,5.494
          Z"
        />
      </Svg>
    );
  }
}