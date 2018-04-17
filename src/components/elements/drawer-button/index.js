import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

import IMG_DRAWER_BUTTON from '../../../icons/drawerButton.png';

export default class DrawerButton extends React.Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
  };

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.container}>
        <Image source={IMG_DRAWER_BUTTON}/>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
