import React, {Component} from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';

import {themeEnum} from '../../../enums';
import styles from './styles';

export default class FieldError extends Component {

  static propTypes = {
    theme: PropTypes.string,
    errors: PropTypes.any,
    path: PropTypes.string,
    textStyle: PropTypes.any,
    style: PropTypes.any,
  };

  static defaultProps = {
    theme: themeEnum.light,
    errors: [],
    path: '',
  };

  renderItems(_styles) {
    const {errors, path, textStyle} = this.props;

    if (!errors && !(errors instanceof Array) && !(errors instanceof Object)) {
      return null;
    }

    let _errors = errors instanceof Array ? errors : [errors];
    const items = [];

    _errors.map((item, index) => {
      if (!item || !item.message || item.path === undefined || item.path === null) {
        return;
      }

      if ((item.path && item.path.indexOf(path) === 0 && path.length > 0) ||
        (item.path.length === 0 && path.length === 0) ||
        (!item.path && !path)) {
        items.push((
          <Text key={item.code || index} style={[_styles.text, textStyle]}>
            {item.message}
          </Text>
        ));
      }

    });

    return items;
  }

  render() {
    const {theme, style} = this.props;
    const _styles = styles({theme});
    const items = this.renderItems(_styles);

    if (!items || !items.length) {
      return null;
    }

    return (
      <View style={[_styles.container, style]}>
        {items}
      </View>
    );
  }
}
