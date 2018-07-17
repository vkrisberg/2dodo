import React, {PureComponent} from 'react';
import {View, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import {themeEnum} from '../../../enums';
import {colors} from '../../../styles';

export default class Loader extends PureComponent {

  static propTypes = {
    theme: PropTypes.string,
    inheritSizes: PropTypes.bool,
  };

  static defaultProps = {
    theme: themeEnum.light,
    inheritSizes: false,
  };

  render() {
    const {theme, inheritSizes} = this.props;
    const _styles = styles(theme, inheritSizes);

    return (
      <View style={_styles.container}>
        <ActivityIndicator size={'large'} color={colors[theme].blue}/>
      </View>
    );
  }
}
