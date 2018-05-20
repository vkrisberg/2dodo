import React, {PureComponent} from 'react';
import {Text} from 'react-native';

import TabsContainer from '../tabs-container';
import { routeEnum } from '../../enums';

export default class Groups extends PureComponent {
  render() {
    return (
      <TabsContainer selected={routeEnum.Groups}>
        <Text>Groups</Text>
      </TabsContainer>
    );
  }
}
