import React, { PureComponent } from 'react';

import {Wrapper, StyledText} from './styles';

export default class Title extends PureComponent {
  render() {
    const {
      children,
      value,
      style,
      textStyle
    } = this.props;
    
    return (
      <Wrapper style={style}>
        <StyledText style={textStyle}>{children || value}</StyledText>
      </Wrapper>
    );
  }
}
