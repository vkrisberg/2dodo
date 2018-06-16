import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import PropTypes from 'prop-types';

import {ArrowIcon} from '../../icons';
import {themeEnum} from '../../../enums';
import {colors} from '../../../styles';
import styles from './styles';

class BackButton extends Component {

  static propTypes = {
    theme: PropTypes.string,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    style: PropTypes.any,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    theme: themeEnum.light,
    color: themeEnum.light.backButton,
    disabled: false,
  };

  onPress = () => {
    if (this.props.onPress) {
      return this.props.onPress();
    }

    this.props.navigation.goBack();
  };

  render() {
    let {theme, disabled, style} = this.props;
    const color = this.props.color || colors[theme].backButton;
    const _styles = styles({theme});

    return (
      <TouchableOpacity style={[_styles.container, style]}
                        disabled={disabled}
                        onPress={this.onPress}>
        <ArrowIcon color={color}/>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(BackButton);
