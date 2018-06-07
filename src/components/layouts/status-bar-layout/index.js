import React, {PureComponent} from 'react';
import {StatusBar, View} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

export default class StatusBarLayout extends PureComponent {

  static propTypes = {
    barHidden: PropTypes.bool,
    barStyle: PropTypes.string,
  };

  static defaultProps = {
    barHidden: false,
    barStyle: 'light-content'
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          animated={true}
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0)"
          hidden={this.props.barHidden}
          barStyle={this.props.barStyle}
        />
        {this.props.children}
      </View>
    );
  }
}
