import React, {PureComponent} from 'react';
import {Svg, Path} from 'react-native-svg';

export default class FavoritsIcon extends PureComponent {
  render() {
    const { active } = this.props;

    return (
      <Svg width="37" height="35">
        <Path
          strokeWidth="2"
          stroke={active ? "rgb(98, 163, 255)" : "rgb(164, 167, 174)"}
          fillOpacity={active ? 1 : 0}
          fill={active ? "rgb(98, 163, 255)" : "white"}
          d="M18.579,25.430 C10.288,32.232 8.128,30.653 12.098,20.694 C3.064,14.914 3.899,12.372 14.602,13.069
          C17.310,2.696 19.986,2.704 22.631,13.093 C33.338,12.462 34.158,15.008 25.089,20.733 C28.999,30.716
          26.829,32.282 18.579,25.430 Z"
        />
      </Svg>
    );
  }
}