import React, {PureComponent} from 'react';
import {G, Path} from 'react';

import CircleIcon from './circle-icon';

export default class AudioIcon extends PureComponent {
  render() {
    return (
      <CircleIcon>
        <G width="17" height="23">
          <Path
            strokeWidth="2"
            stroke="rgb(164, 167, 174)"
            fill="white"
            d="M7.944,5.931 L11.808,5.931 L11.808,17.517 L7.944,17.517 C6.420,17.517 5.184,16.282 5.184,14.757
            L5.184,8.691 C5.184,7.167 6.420,5.931 7.944,5.931 Z"
          />
        </G>
        <G width="25" height="33">
          <Path
            strokeWidth="2"
            stroke="rgb(164, 167, 174)"
            fill="white"
            d="M13.427,7.097 C4.875,13.541 5.414,15.080 5.414,16.724 C5.414,18.453 4.540,20.352 13.427,26.351
            C17.080,28.817 19.822,28.676 19.822,16.724 C19.822,4.773 17.083,4.342 13.427,7.097 Z"
          />
        </G>
        <G width="4" height="15">
          <Path
            strokeWidth="2"
            stroke="rgb(164, 167, 174)"
            fill="white"
            d="M1.780,0.828 C2.237,0.828 2.608,1.198 2.608,1.655 C2.608,1.655 3.160,4.496 3.160,7.364
            C3.160,10.288 2.608,13.241 2.608,13.241 C2.608,13.698 2.237,14.069 1.780,14.069
            C1.323,14.069 0.952,13.698 0.952,13.241 C0.952,13.241 1.504,10.396 1.504,7.526 C1.504,4.604
            0.952,1.655 0.952,1.655 C0.952,1.198 1.323,0.828 1.780,0.828 Z"
          />
        </G>
      </CircleIcon>
    );
  }
}
