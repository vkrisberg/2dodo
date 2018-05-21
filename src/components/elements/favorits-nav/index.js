import React, {Component} from 'react';
import {Text} from 'react-native';

import {favoritsNavEnum} from '../../../enums';

export default class FavoritsNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: favoritsNavEnum[0].text
    };
  }

  render() {
    return (
      <Text>1234</Text>
    );
  }
}