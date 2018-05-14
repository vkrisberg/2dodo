import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image
} from 'react-native';
import { connect } from 'react-redux';

import BottomMenu from '../../components/elements/bottom-menu';

class Contacts extends Component {

  addContact = () => {

  }

  render() {
    return (
      <View>
        <View>
          <Text>
            Contacts
          </Text>
          <TouchableWithoutFeedback onPress={this.addContact}>
            <Text>+</Text>
          </TouchableWithoutFeedback>
        </View>
        <View>
          <Image source="" />
          <Text>Your have not contacts yet</Text>
        </View>
        <BottomMenu />
      </View>
    );
  }
}

export default connect()(Contacts);