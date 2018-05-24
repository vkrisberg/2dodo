import React, {PureComponent} from 'react';
import {Svg, G, Path} from 'react-native-svg';

export default class CircleIcon extends PureComponent {
  render() {
    return (
      <Svg width="52" height="51">
        <G>
          <Path
            strokeWidth="2"
            stroke="rgb(233, 233, 233)"
            fill="white"
            d="M25.672,5.034 C38.080,5.034 46.096,13.047 46.096,25.448 C46.096,37.850 38.080,45.862 25.672,45.862
            C13.264,45.862 5.248,37.850 5.248,25.448 C5.248,13.047 13.264,5.034 25.672,5.034 Z"
          />
        </G>
        {this.props.children}
      </Svg>
    );
  }
}