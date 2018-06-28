import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';

import {themeEnum} from '../../../enums';
import {weights, fontStyle} from '../../../styles';
import styles from './styles';

export default class TextLabel extends PureComponent {

  static propTypes = {
    theme: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number,
    weight: PropTypes.string,
    fontStyle: PropTypes.string,
    textAlign: PropTypes.string,
    style: PropTypes.any,
  };

  static defaultProps = {
    theme: themeEnum.light,
    size: 15,
    weight: weights.medium,
    fontStyle: fontStyle.normal,
    textAlign: 'left',
  };

  render() {
    const {theme, color, size, weight, textAlign, style, fontStyle} = this.props;
    const _styles = styles({theme, color, size, weight, textAlign, fontStyle});

    return (
      <Text style={[_styles.text, style]}>
        {this.props.children}
      </Text>
    );
  }
}
