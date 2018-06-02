import React, { PureComponent } from 'react';
import {
  ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';

import {Container, StyledButton, ButtonText} from './styles';

export default class Button extends PureComponent {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    children: PropTypes.any,
    title: PropTypes.string,
    style: ViewPropTypes.style,
    wrapperStyle: ViewPropTypes.style,
    textStyle: PropTypes.any,
    color: PropTypes.string
  }

  render() {
    const {
      onPress,
      children,
      title,
      style,
      wrapperStyle,
      textStyle,
      color
    } = this.props;

    return (
      <Container style={style}>
        <StyledButton style={wrapperStyle} onPress={onPress} {...this.props} >
          <ButtonText color={color} style={textStyle}>{ children || title }</ButtonText>
        </StyledButton>
      </Container>
    );
  }
}
