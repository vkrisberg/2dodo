import React, {PureComponent} from 'react';
import {View, Image} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

import IMG_LOGO from './img/logo.png';

export default class Logo extends PureComponent {

  static propTypes = {
    style: PropTypes.any,
  };

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Image style={styles.image} source={IMG_LOGO}/>
      </View>
    );
  }
}
