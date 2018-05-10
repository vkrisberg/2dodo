import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

import drawerIcon from './img/drawerButton.png';

export default class DrawerButton extends React.Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
  };

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.container}>
        <Image source={drawerIcon}/>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
