import React, { PureComponent } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';

import {Container, StyledButton, ButtonText} from './styles';

export default class Button extends PureComponent {
  
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    children: PropTypes.string,
    title: PropTypes.string,
    style: ViewPropTypes.style,
    wrapperStyle: ViewPropTypes.style,
    textStyle: ViewPropTypes.style,
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