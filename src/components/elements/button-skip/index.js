import React, {PureComponent} from 'react';
import {TouchableWithoutFeedback} from 'react-native';

import {SkipWrapper, StyledSkip, SvgWrapper} from './styles';
import Icon from './icon';

export default class ButtonSkip extends PureComponent {
  render() {
    const {
      onSkip,
      children,
      color,
      marginBottom,
      disabled,
    } = this.props;

    return (
      <TouchableWithoutFeedback disabled={disabled} onPress={onSkip}>
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
