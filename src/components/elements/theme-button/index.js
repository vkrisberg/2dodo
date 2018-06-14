import React, {PureComponent} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {Svg} from 'react-native-svg';
import PropTypes from 'prop-types';

import MarkIcon from '../../icons/mark-icon';
import {themeEnum} from '../../../enums';
import {colors} from '../../../styles';
import styles from './styles';

export default class ThemeButton extends PureComponent {

  static propTypes = {
    context: PropTypes.object,
    theme: PropTypes.string,
    type: PropTypes.string,
    style: PropTypes.any,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    theme: themeEnum.light,
    type: themeEnum.light,
  };

  onPress = () => {
    const {onPress} = this.props;
    onPress && onPress();
  };

  render() {
    const {theme, context, type, style} = this.props;
    const isActive = theme === type;
    const isDayLight = type === 'light';
    const color = isDayLight ? colors.light.black : colors.light.white;
    let bgColor, borderColor;
    if (isDayLight) {
      bgColor = isActive ? colors.light.whiteSmoke : colors.light.white;
      borderColor = bgColor;
    } else {
      borderColor = isActive ? colors.light.grayBorder : colors.light.blackNight;
      bgColor = colors.light.blackNight;
    }
    const _styles = styles({theme, color, bgColor, borderColor});
    const text = isDayLight ? context.t('DayLight') : context.t('DarkNight');

    return (
      <TouchableOpacity style={[_styles.container, style]}
                        onPress={this.onPress}>
        <Text style={_styles.text}>{text}</Text>
        {isActive && <MarkIcon color={color}/>}
      </TouchableOpacity>
    );
  }
}
