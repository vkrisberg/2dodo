import React, {Component} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import {FavoritsDotsIcon} from '../../icons';
import {themeEnum} from '../../../enums';
import {colors} from '../../../styles';
import styles from './styles';

export default class NavbarDots extends Component {

  static propTypes = {
    theme: PropTypes.string,
    color: PropTypes.string,
    style: PropTypes.any,
  };

  static defaultProps = {
    theme: themeEnum.light,
    color: themeEnum.light.backButton,
  };

  render() {
    let {theme, style} = this.props;
    const color = this.props.color || colors[theme].backButton;
    const _styles = styles({theme});

    return (
      <View style={[_styles.container, style]}>
        <FavoritsDotsIcon color={color}/>
      </View>
    );
  }
}
