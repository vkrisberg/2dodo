import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {withNavigation} from 'react-navigation';

import {Container, StyledText} from './styles';

class Tab extends PureComponent {

  static propTypes = {
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
    fontSize: PropTypes.number,
    navigation: PropTypes.shape({}),
    activeIcon: PropTypes.node
  }

  _handleTabPress = () => {
    const { text, navigation } = this.props;

    navigation.navigate(text);
  }

  _getColor = () => {
    const {
      selected,
      text
    } = this.props;

    if (selected === text) {
      return "#68a7ff";
    }

    return "#a4a7ae";
  }

  render() {
    const {
      pressOpacity,
      icon,
      fontSize,
      text,
      activeIcon,
      selected
    } = this.props;

    return (
      <Container
        onPress={this._handleTabPress}
        activeOpacity={pressOpacity}
      >
        {selected === text ? activeIcon : icon}
        <StyledText color={this._getColor()} fontSize={fontSize}>
          {text}
        </StyledText>
      </Container>
    );
  }
}

export default withNavigation(Tab);
