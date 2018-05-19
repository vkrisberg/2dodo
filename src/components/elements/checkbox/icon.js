import React, { PureComponent } from 'react';
import {
  Svg,
  G,
  Circle
} from 'react-native-svg';

import MarkIcon from '../../icons/mark-icon';

export default class Icon extends PureComponent {
  render() {
    const { checked, color } = this.props;

    return (
      <Svg height="30" width="30">
        <G>
          <Circle
            cx="16"
            cy="12"
            r="11"
            stroke={checked ? "#62a3ff" : color || 'black'}
            strokeWidth="2"
            fill={checked ? '#62a3ff': 'transparent'}
          />
        </G>
        {checked && <MarkIcon />}
        
      </Svg>
    );
  }
}