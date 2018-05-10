import React, {Component} from 'react';
import {
  Text,
  View
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Link from '../../components/elements/link';
import styles from './styles';

class Main extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({})
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.context.t('Main')}
        </Text>
        <Link
          navigation={navigation}
          to="Login"
          title={this.context.t('Login')}
          label="Go to Login"
        />
      </View>
    );
  }
}

export default connect(state => ({
  i18n: state.i18nState,
}))(Main);
