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

  constructor(props) {
    super(props);
    const {theme, inheritSizes} = props;
    this.styles = styles(theme, inheritSizes);
  }

  render() {
    const {theme} = this.props;

    return (
      <View style={this.styles.container}>
        <ActivityIndicator size={'large'} color={colors[theme].blue}/>
      </View>
    );
  }
}
