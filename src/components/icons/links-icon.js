import React, {PureComponent} from 'react';
import {G, Path} from 'react-native-svg';

import {CircleIcon} from './index';

export default class LinksIcon extends PureComponent {
  render() {
    return (
      <CircleIcon>
        <G width="28" height="22" x="15" y="12">
          <Path
            strokeWidth="2px"
            stroke="rgb(164, 167, 174)"
            fillOpacity="0"
            fill="rgb(164, 167, 174)"
            d="M13.840,5.172 C18.870,5.172 22.120,5.774 22.120,10.690 C22.120,15.606 18.870,16.207 13.840,16.207
            C8.810,16.207 5.560,15.606 5.560,10.690 C5.560,5.774 8.810,5.172 13.840,5.172 Z"
          />
        </G>
        <G x="9" y="17">
          <Path
            strokeWidth="2px"
            stroke="rgb(164, 167, 174)"
            fillOpacity="0"
            fill="rgb(164, 167, 174)"
            d="M13.840,5.172 C18.870,5.172 22.120,5.774 22.120,10.690 C22.120,15.606 18.870,16.207 13.840,16.207
            C8.810,16.207 5.560,15.606 5.560,10.690 C5.560,5.774 8.810,5.172 13.840,5.172 Z"
          />
        </G>
      </CircleIcon>
    );
  }
}