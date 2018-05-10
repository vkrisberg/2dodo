import React, { Component } from 'react';
import { Image, TouchableOpacity, ViewPropTypes } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

import arrowIcon from './img/arrow.png';
import styles from './styles';

class Arrow extends Component {

  static propTypes = {
    left: PropTypes.bool,
    right: PropTypes.bool,
    navigation: PropTypes.shape({}),
    onPress: PropTypes.func,
    style: ViewPropTypes.style
  }

  getStyles = () => {
    const styleArr = [styles.arrow];
    const { right } = this.props;

    if (right) {
      styleArr.push(styles.arrowRight);

      return styleArr;
    }

    return [...styleArr, styles.arrowLeft];
  }

  render() {
    const{ style, onPress } = this.props;

    return (
      <TouchableOpacity style={[style, styles.wrapper]} onPress={onPress}>
        <Image style={this.getStyles()} source={arrowIcon} />
      </TouchableOpacity>
    );
  }
}

export default withNavigation(Arrow);