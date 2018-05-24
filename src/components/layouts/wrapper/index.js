import React, {PureComponent} from 'react';
import {StatusBar, ScrollView} from 'react-native';

import {Container, ScrolledContainer} from './styles';

const ViewWrap = (props) => (
  props.scrolled
    ? <ScrollView contentContainerStyle={ScrolledContainer}>{props.children}</ScrollView>
    : <Container>{props.children}</Container>
);

export default class Wrapper extends PureComponent {
  render() {
    const { scrolled, children, barHidden } = this.props;

    return (
      <ViewWrap scrolled={scrolled}>
        <StatusBar
          animated
          hidden={barHidden || false}
          translucent
          backgroundColor="rgba(0, 0, 0, 0)"
          barStyle="dark-content"
        />
        {children}
      </ViewWrap>
    );
  }
}