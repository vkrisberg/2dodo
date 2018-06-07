import React, {PureComponent} from 'react';
import {TouchableWithoutFeedback} from 'react-native';

import {SkipWrapper, StyledSkip, SvgWrapper} from './styles';
import Icon from './icon';

export default class Skip extends PureComponent {
  render() {
    const {
      onSkip,
      children,
      color,
      marginBottom
    } = this.props;

    return (
      <TouchableWithoutFeedback onPress={onSkip}>
        <SkipWrapper marginBottom={marginBottom}>
          <StyledSkip color={color}>
            {children}
          </StyledSkip>
          <SvgWrapper>
            <Icon color={color} />
          </SvgWrapper>
        </SkipWrapper>
      </TouchableWithoutFeedback>
    );
  }
}
