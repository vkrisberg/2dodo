import React, {PureComponent} from 'react';
import {Text} from 'react-native';

import TabsContainer from '../tabs-container';
import {routeEnum} from '../../enums';

export default class Favorits extends PureComponent {
  render() {
    return (
      <TabsContainer selected={routeEnum.Favorits}>
        <Text>Favorits</Text>
      </TabsContainer>
    );
  }
}
