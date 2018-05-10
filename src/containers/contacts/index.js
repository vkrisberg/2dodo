import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class Contacts extends Component {
  render() {
    return (
      <View>
        <Text>Contacts</Text>
      </View>
    );
  }
}

export default connect()(Contacts);