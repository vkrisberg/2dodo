import React, { PureComponent } from 'react';
import {StatusBar} from 'react-native';

import {Container} from './styles';

export default class Wrapper extends PureComponent {
  render() {
    return (
      <Container>
        <StatusBar
          translucent
          backgroundColor="rgba(0, 0, 0, 0.2)"
          animated
        />
        {this.props.children}
      </Container>
    );
  }
}