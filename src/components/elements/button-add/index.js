import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

import {AddIcon} from '../../icons';
import {themeEnum} from '../../../enums';
import {colors} from '../../../styles';
import styles from './styles';

export default class ButtonAdd extends Component {

  static propTypes = {
    theme: PropTypes.string,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    style: PropTypes.any,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    theme: themeEnum.light,
    color: themeEnum.light.addButton,
    disabled: false,
  };

  onPress = () => {
    this.props.onPress && this.props.onPress();
  };

  render() {
    let {theme, disabled, style} = this.props;
    const color = this.props.color || colors[theme].addButton;
    const _styles = styles({theme});

    return (
      <TouchableOpacity style={[_styles.container, style]}
                        disabled={disabled}
                        onPress={this.onPress}>
        <AddIcon color={color}/>
      </TouchableOpacity>
    );
  }
}
