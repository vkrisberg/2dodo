import React, {PureComponent} from 'react';
import {TouchableWithoutFeedback, View, Text} from 'react-native';
import PropTypes from 'prop-types';

import Icon from './icon';
import {colors} from '../../../styles';
import {themeEnum} from '../../../enums';
import styles from './styles';

export default class ButtonSkip extends PureComponent {
  static propTypes = {
    theme: PropTypes.string,
    children: PropTypes.any,
    onSkip: PropTypes.func,
    color: PropTypes.any,
    marginBottom: PropTypes.number,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    theme: themeEnum.light,
    onSkip: () => {},
    marginBottom: 0,
    disabled: false,
  };

  render() {
    const {
      theme,
      onSkip,
      children,
      color,
      marginBottom,
      disabled,
    } = this.props;
    const _styles = styles(theme);

    return (
      <TouchableWithoutFeedback disabled={disabled} onPress={onSkip}>
        <View style={[_styles.skipWrapper, {marginBottom: marginBottom}]}>
          <Text style={[_styles.text, {color: color || colors[theme].white}]} color={color}>
            {children}
          </Text>
          <View style={_styles.svg}>
            <Icon color={color} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
