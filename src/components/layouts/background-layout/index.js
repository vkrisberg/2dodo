import React, {PureComponent} from 'react';
import {StatusBar, View, ScrollView, Image, Dimensions} from 'react-native';
import PropTypes from 'prop-types';

import {themeEnum} from '../../../enums';
import styles from './styles';

import BG_LOGIN from './img/bg_login.png';
import BG_PRELOAD from './img/bg_preload.png';
import BG_REGISTRATION from './img/bg_registration.png';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const registrationRatio = 0.341333333333333;

export default class BackgroundLayout extends PureComponent {

  static propTypes = {
    theme: PropTypes.string,
    background: PropTypes.string,
    barHidden: PropTypes.bool,
    barStyle: PropTypes.string,
    paddingHorizontal: PropTypes.number,
    paddingVertical: PropTypes.number,
    style: PropTypes.any,
  };

  static defaultProps = {
    theme: themeEnum.light,
    background: 'none', // [none, preload, login, registration]
    barHidden: false,
    barStyle: 'dark-content',
    paddingHorizontal: 0,
    paddingVertical: 0,
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

  renderImage = (_styles) => {
    if (this.props.background !== 'none') {
      return (
        <Image style={_styles.image}
               source={this.getBackground()}
               width={deviceWidth}
               height={this.getImageHeight()}/>
      );
    }
  };

  render() {
    const {theme, style, barHidden, barStyle, paddingHorizontal, paddingVertical} = this.props;
    const _styles = styles({theme, paddingHorizontal, paddingVertical});

    return (
      <View style={[_styles.container, style]}>
        <StatusBar
          animated={true}
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0)"
          hidden={barHidden}
          barStyle={barStyle}/>
        {this.renderImage(_styles)}
        {this.props.children}
      </View>
    );
  }
}
