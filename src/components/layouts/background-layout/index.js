import React, {PureComponent} from 'react';
import {StatusBar, View, ScrollView, Image, Dimensions} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

import BG_LOGIN from './img/bg_login.png';
import BG_PRELOAD from './img/bg_preload.png';
import BG_REGISTRATION from './img/bg_registration.png';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const registrationRatio = 0.341333333333333;

export default class BackgroundLayout extends PureComponent {

  static propTypes = {
    background: PropTypes.string,
    barHidden: PropTypes.bool,
    barStyle: PropTypes.string,
    style: PropTypes.any,
  };

  static defaultProps = {
    background: 'preload', // [preload, login, registration]
    barHidden: false,
    barStyle: 'light-content'
  };

  getBackground = () => {
    switch (this.props.background) {
      case 'login':
        return BG_LOGIN;
      case 'registration':
        return BG_REGISTRATION;
      default:
        return BG_PRELOAD;
    }
  };

  getImageHeight = () => {
    return this.props.background === 'registration'
      ? deviceWidth * registrationRatio
      : deviceHeight;
  };

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <StatusBar
          animated={true}
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0)"
          hidden={this.props.barHidden}
          barStyle={this.props.barStyle}/>
        <Image style={styles.image}
               source={this.getBackground()}
               width={deviceWidth}
               height={this.getImageHeight()}/>
        {this.props.children}
      </View>
    );
  }
}
