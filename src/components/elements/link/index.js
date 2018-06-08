import React, {PureComponent} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {withNavigation} from 'react-navigation';

import styles from './styles';
import {colors} from '../../../styles';

class Link extends PureComponent {

  static propTypes = {
    label: PropTypes.string,
    children: PropTypes.string,
    to: PropTypes.string.isRequired,
    navigation: PropTypes.shape({}),
    color: PropTypes.string,
    style: PropTypes.any,
    textStyle: PropTypes.any,
  };

  handleLink = () => {
    const {navigation, to} = this.props;

    return navigation.navigate(`${to}`);
  };

  render() {
    const {label, children, color, style, textStyle} = this.props;

    return (
      <TouchableOpacity style={[styles.container, style]} onPress={this.handleLink}>
        <Text style={[styles.link, textStyle, {color: color || colors.white}]}>{label || children}</Text>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(Link);
