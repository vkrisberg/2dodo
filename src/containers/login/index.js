import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Login extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.context.t('Login')}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default connect(state => ({}))(Login);
