import React, {PureComponent} from 'react';
import {Text, Image, View, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';

import {Checkbox} from '../index';
import {themeEnum} from '../../../enums';
import {colors} from '../../../styles';
import styles from './styles';

import arrowIcon from '../../../images/icons/arrow-right/arrow_right.png';

export default class SettingsListItem extends PureComponent {

  static propTypes = {
    theme: PropTypes.string,
    context: PropTypes.object,
    text: PropTypes.string,
    onPress: PropTypes.func,
    border: PropTypes.bool,
    checkbox: PropTypes.bool,
    checkboxValue: PropTypes.bool,
    navigate: PropTypes.bool,
    navigateText: PropTypes.string,
    rowStyles: PropTypes.any,
  };

  static defaultProps = {
    theme: themeEnum.light,
    onPress: () => {},
    border: true,
    rowStyles: {},
  };

  onPress = () => {
    this.props.onPress();
  };

  render() {
    const {theme, context, text, border, checkbox, checkboxValue, navigate, navigateText, rowStyles} = this.props;
    const _styles = styles(theme);

    return (
      <TouchableHighlight
        onPress={this.onPress}
        underlayColor={colors[theme].blueKrayolaDim}
        style={_styles.settingsRowContainer}>
        <View style={[_styles.settingsRow, !border && {borderBottomWidth: 0}, rowStyles]}>
          <Text style={[_styles.defaultText, _styles.blackText]}>{context.t(text)}</Text>
          <View style={_styles.settingsRowRight}>
            {checkbox && <Checkbox input={{value: checkboxValue, onChange: this.onPress}}/>}
            {navigate && navigateText && <Text style={[_styles.defaultText, _styles.grayText]}>{navigateText}</Text>}
            {navigate && <Image source={arrowIcon} style={_styles.arrowIcon}/>}
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
