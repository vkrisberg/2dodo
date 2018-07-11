import React, {PureComponent} from 'react';
import {View, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import {themeEnum} from '../../../enums';
import {colors} from '../../../styles';

export default class Loader extends PureComponent {

  static propTypes = {
    theme: PropTypes.string,
  };

  static defaultProps = {
    theme: themeEnum.light,
  };

  render() {
    const {theme} = this.props;
    const _styles = styles(theme);

    return (
      <View style={_styles.container}>
        <ActivityIndicator size={'large'} color={colors[theme].blue}/>
      </View>
    );
  }
}
