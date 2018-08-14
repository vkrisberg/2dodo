import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

import {themeEnum} from '../../../enums';
import styles from './styles';

export default class Navbar extends Component {

  static propTypes = {
    theme: PropTypes.string,
    renderTitle: PropTypes.any,
    renderLeft: PropTypes.any,
    renderRight: PropTypes.any,
    style: PropTypes.any,
  };

  static defaultProps = {
    theme: themeEnum.light,
    renderTitle: '',
    renderLeft: null,
    renderRight: null,
  };

  renderTitle = (_styles) => {
    if (typeof this.props.renderTitle === 'function') {
      return this.props.renderTitle();
    }

    if (typeof this.props.renderTitle === 'object') {
      return this.props.renderTitle;
    }

    return (
      <Text style={_styles.title}>
        {this.props.renderTitle}
      </Text>
    );
  };

  renderLeft = () => {
    if (typeof this.props.renderLeft === 'function') {
      return this.props.renderLeft();
    }

    return this.props.renderLeft;
  };

  renderRight = () => {
    if (typeof this.props.renderRight === 'function') {
      return this.props.renderRight();
    }

    return this.props.renderRight;
  };

  render() {
    const {theme, style} = this.props;
    const _styles = styles({theme});

    return (
      <View style={[_styles.container, style]}>
        {this.renderLeft()}
        <View style={_styles.titleContainer}>
          {this.renderTitle(_styles)}
        </View>
        {this.renderRight()}
      </View>
    );
  }
}
