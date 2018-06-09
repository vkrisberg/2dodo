import React, {PureComponent} from 'react';
import {
  ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';

import {Container, StyledButton, ButtonText} from './styles';
import {colors} from '../../../styles';
import {themeEnum} from '../../../enums';

export default class Button extends PureComponent {

  static propTypes = {
    theme: PropTypes.string,
    onPress: PropTypes.func,
    children: PropTypes.any,
    title: PropTypes.string,
    style: ViewPropTypes.style,
    wrapperStyle: ViewPropTypes.style,
    textStyle: PropTypes.any,
    color: PropTypes.string
  };

  static defaultProps = {
    theme: themeEnum.light,
    placeholder: '',
    textColor: colors.light.black,
    focusedColor: colors.light.blue,
    borderColor: colors.light.gray,
    placeholderColor: colors.light.grayPlaceholder,
  };

  onPress = () => {
    const {onPress} = this.props;

    onPress && onPress();
  };

  render() {
    const {
      children,
      title,
      style,
      wrapperStyle,
      textStyle,
      color
    } = this.props;

    return (
      <Container style={style}>
        <StyledButton style={wrapperStyle} onPress={this.onPress} {...this.props} >
          <ButtonText color={color} style={textStyle}>{children || title}</ButtonText>
        </StyledButton>
      </Container>
    );
  }
}
