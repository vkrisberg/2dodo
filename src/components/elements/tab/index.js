import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {withNavigation} from 'react-navigation';
import {TouchableOpacity, Text} from 'react-native';

import styles from './styles';
import {colors} from '../../../styles';
import {themeEnum} from "../../../enums";

class Tab extends PureComponent {

  static propTypes = {
    theme: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    fontStyle: PropTypes.object,
    selected: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    activeColor: PropTypes.string,
    unActiveColor: PropTypes.string,
    icon: PropTypes.node,
    text: PropTypes.string,
    onTabPress: PropTypes.func,
    tabIndex: PropTypes.number,
    pressOpacity: PropTypes.number,
    navigation: PropTypes.shape({}),
    activeIcon: PropTypes.node
  };

  static defaultProps = {
    theme: themeEnum.light,
  };

  _handleTabPress = () => {
    const { text, navigation } = this.props;

    navigation.navigate(text);
  };

  _getColor = () => {
    const {
      selected,
      text,
      theme
    } = this.props;

    if (selected === text) {
      return colors[theme].blueCornFlower;
    }

    return colors[theme].grayIcon;
  };

  render() {
    const {
      theme,
      pressOpacity,
      icon,
      text,
      activeIcon,
      selected
    } = this.props;
    const _styles = styles(theme);

    return (
      <TouchableOpacity
        style={_styles.container}
        onPress={this._handleTabPress}
        activeOpacity={pressOpacity}>
        {selected === text ? activeIcon : icon}
        <Text style={[_styles.text, {color: this._getColor()}]}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(Tab);
