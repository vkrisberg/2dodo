import React, {PureComponent} from 'react';
import {Svg, Path, G} from 'react-native-svg';

export default class GroupsIcon extends PureComponent {
  render() {
    const { active } = this.props;

    return (
      <Svg width="35" height="35">
        <G>
          <Path
            strokeWidth="2"
            stroke={active ? "rgb(98, 163, 255)" : "rgb(164, 167, 174)"}
            fillOpacity={active ? 1 : 0}
            fill={active ? "rgb(98, 163, 255)" : "white"}
            d="M17.280,5.241 C24.658,5.241 29.424,10.005 29.424,17.379 C29.424,24.753 24.658,29.517 17.280,29.517
            C9.902,29.517 5.136,24.753 5.136,17.379 C5.136,10.005 9.902,5.241
            17.280,5.241 Z"
          />
        </G>
        <G width="26" height="27" x="4" y="4">
          <Path
            strokeWidth="2"
            stroke={active ? "white" : "rgb(164, 167, 174)"}
            fillOpacity={active ? 1 : 0}
            fill={active ? "rgb(98, 163, 255)" : "white"}
            d="M13.280,5.655 C17.975,5.655 21.008,8.687 21.008,13.379 C21.008,18.072 17.975,21.103 13.280,21.103
            C8.585,21.103 5.552,18.072 5.552,13.379 C5.552,8.687 8.585,5.655 13.280,5.655 Z"
          />
        </G>
        <G width="17" height="17" x="9" y="9">
          <Path
            strokeWidth="2"
            stroke={active ? "white" : "rgb(164, 167, 174)"}
            fillOpacity={active ? 1 : 0}
            fill={active ? "rgb(98, 163, 255)" : "white"}
            d="M8.280,5.621 C9.957,5.621 11.040,6.703 11.040,8.379 C11.040,10.055 9.957,11.138 8.280,11.138
            C6.603,11.138 5.520,10.055 5.520,8.379 C5.520,6.703 6.603,5.621 8.280,5.621 Z"/
          >
        </G>
      </Svg>
    );
  }
}