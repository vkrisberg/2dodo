import React, {PureComponent} from 'react';
import {Text} from 'react-native';

import {Wrapper} from '../../components/layouts';

export default class Settings extends PureComponent {
  render() {
    return (
      <Wrapper scrolled>
        <Text>Settings</Text>
      </Wrapper>
    );
  }
}
