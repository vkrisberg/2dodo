import React, {PureComponent} from 'react';
import {TouchableOpacity, Image, View} from 'react-native';
import PropTypes from 'prop-types';

import {themeEnum} from '../../../enums';
import styles from './styles';

export default class ButtonsSwipe extends PureComponent {

  static propTypes = {
    theme: PropTypes.string,
    firstBtnImage: PropTypes.any,
    secondBtnImage: PropTypes.any,
    thirdBtnImage: PropTypes.any,
    firstBtnHandler: PropTypes.func,
    secondBtnHandler: PropTypes.func,
    thirdBtnHandler: PropTypes.func,
  };

  static defaultProps = {
    theme: themeEnum.light,
    firstBtnHandler: () => {},
    secondBtnHandler: () => {},
    thirdBtnHandler: () => {},
  };

  render() {
    const {theme, firstBtnImage, secondBtnImage, thirdBtnImage, firstBtnHandler, secondBtnHandler, thirdBtnHandler} = this.props;
    const _styles = styles(theme);

    return (
      <View style={_styles.btnContainer}>
        <TouchableOpacity onPress={firstBtnHandler}>
          <Image source={firstBtnImage} style={_styles.btn}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={secondBtnHandler}>
          <Image source={secondBtnImage} style={_styles.btn}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={thirdBtnHandler}>
          <Image source={thirdBtnImage}/>
        </TouchableOpacity>
      </View>
    );
  }
}
