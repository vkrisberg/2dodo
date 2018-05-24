import React, {PureComponent} from 'react';
import {Svg, Path} from 'react-native-svg';

export default class FavoritsDotsIcon extends PureComponent {
  render() {
    return (
      <Svg width="13" height="22">
        <Path
          fill="rgb(106, 118, 134)"
          d="M10.568,13.069 C9.349,13.069 8.360,12.081 8.360,10.862 C8.360,9.643 9.349,8.655 10.568,8.655
          C11.787,8.655 12.776,9.643 12.776,10.862 C12.776,12.081 11.787,13.069 10.568,13.069 ZM10.568,4.793
          C9.349,4.793 8.360,3.805 8.360,2.586 C8.360,1.367 9.349,0.379 10.568,0.379 C11.787,0.379 12.776,1.367
          12.776,2.586 C12.776,3.805 11.787,4.793 10.568,4.793 ZM2.288,21.345 C1.069,21.345 0.080,20.357 0.080,19.138
          C0.080,17.919 1.069,16.931 2.288,16.931 C3.507,16.931 4.496,17.919 4.496,19.138 C4.496,20.357 3.507,21.345
          2.288,21.345 ZM2.288,13.069 C1.069,13.069 0.080,12.081 0.080,10.862 C0.080,9.643 1.069,8.655 2.288,8.655
          C3.507,8.655 4.496,9.643 4.496,10.862 C4.496,12.081 3.507,13.069 2.288,13.069 ZM2.288,4.793 C1.069,4.793
          0.080,3.805 0.080,2.586 C0.080,1.367 1.069,0.379 2.288,0.379 C3.507,0.379 4.496,1.367 4.496,2.586 C4.496,3.805
          3.507,4.793 2.288,4.793 ZM10.568,16.931 C11.787,16.931 12.776,17.919 12.776,19.138 C12.776,20.357 11.787,21.345
          10.568,21.345 C9.349,21.345 8.360,20.357 8.360,19.138 C8.360,17.919 9.349,16.931 10.568,16.931 Z"
        />
      </Svg>
    );
  }
}