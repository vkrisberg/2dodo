import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {favoritesNavEnum} from '../../../enums';
import {Tabs} from './styles';
import {Tab} from '../index';

export default class FavoritsNav extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
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
  }

  static defaultProps = {
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
  }

  render() {
    const {
      selected,
      activeColor,
      unActiveColor,
      iconSize,
      onlyIcon,
      pressOpacity,
      fontSize
    } = this.props;

    return (
      <Tabs>
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
      </Tabs>
    );
  }
}
