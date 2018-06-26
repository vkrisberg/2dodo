import React, {PureComponent} from 'react';
import {View, ScrollView, Text} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

export default class MainLayout extends PureComponent {

  static propTypes = {
    scrolled: PropTypes.bool,
    netOffline: PropTypes.bool,
    wsConnected: PropTypes.bool,
    style: PropTypes.any,
  };

  static defaultProps = {
    scrolled: false,
    netOffline: false,
    wsConnected: true,
  };

  renderNetInfo = () => {
    return (
      <View style={styles.netinfo}>
        <Text style={styles.netinfoText}>Network error. Device is offline...</Text>
      </View>
    );
  };

  renderWsInfo = () => {
    return (
      <View style={styles.wsinfo}>
        <Text style={styles.wsinfoText}>Server connection problems. Please wait...</Text>
      </View>
    );
  };

  renderScrollView = () => {
    return (
      <ScrollView style={[styles.container, this.props.style]}>
        {this.props.netOffline && this.renderNetInfo()}
        {this.props.children}
      </ScrollView>
    );
  };

  render() {
    if (this.props.scrolled) {
      return this.renderScrollView();
    }

    return (
      <View style={[styles.container, this.props.style]}>
        {this.props.netOffline && this.renderNetInfo()}
        {!this.props.wsConnected && this.renderWsInfo()}
        {this.props.children}
      </View>
    );
  }
}
