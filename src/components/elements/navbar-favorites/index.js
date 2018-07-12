import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';

import {Tab} from '../index';
import {favoritesNavEnum, themeEnum} from '../../../enums';
import styles from './styles';

export default class NavbarFavorites extends Component {

  static propTypes = {
    theme: PropTypes.string,
    selected: PropTypes.number,
    activeColor: PropTypes.string,
    unActiveColor: PropTypes.string,
    onTabChange: PropTypes.func,
    backgroundColor: PropTypes.string,
    borderTopColor: PropTypes.string,
    height: PropTypes.number,
    iconSize: PropTypes.number,
    onlyIcon: PropTypes.bool,
    pressOpacity: PropTypes.number,
    fontStyle: PropTypes.object,
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number
    ]),
    children: PropTypes.any,
    fontSize: PropTypes.number,
    scrolled: PropTypes.bool
  };

  static defaultProps = {
    theme: themeEnum.light,
    onTabChange: () => {},
    activeColor: 'black',
    unActiveColor: 'gray',
    backgroundColor: 'white',
    borderTopColor: '#DDDDDD',
    height: 42,
    iconSize: 22,
    onlyIcon: false,
    pressOpacity: 0.7,
    fontSize: 11,
  };

  render() {
    const {
      theme,
      selected,
      activeColor,
      unActiveColor,
      iconSize,
      onlyIcon,
      pressOpacity,
      fontSize
    } = this.props;
    const _styles = styles(theme);

    return (
      <View style={_styles.container}>
        {favoritesNavEnum.map((child, tabIndex) => {
          return <Tab
            key={child.text}
            tabIndex={tabIndex}
            selected={selected}
            activeColor={activeColor}
            unActiveColor={unActiveColor}
            iconSize={iconSize}
            onlyIcon={onlyIcon}
            pressOpacity={pressOpacity}
            fontSize={fontSize}
            icon={child.icon}
            activeIcon={child.activeIcon}
            text={child.text}
          />;
        })
        }
      </View>
    );
  }
}
