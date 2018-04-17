import React, {Component} from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Main extends Component {

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
          {this.context.t('Main')}
        </Text>
        <Button
          onPress={() => this.props.navigation.navigate('Login', {title: this.context.t('Login')})}
          title="Go to Login"
        />
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

export default connect(state => ({
  i18n: state.i18nState,
}))(Main);
