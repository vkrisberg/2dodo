import React, {PureComponent} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';
import {withNavigation} from 'react-navigation';

class Link extends PureComponent {

  static propTypes = {
    label: PropTypes.string,
    children: PropTypes.string,
    to: PropTypes.string.isRequired,
    navigation: PropTypes.shape({}),
    color: PropTypes.string,
    style: PropTypes.any,
  }

  handleLink = () => {
    const {navigation, to} = this.props;

    return navigation.navigate(`${to}`);
  }

  render() {
    const {label, children, color, style} = this.props;

    return (
      <TouchableOpacity onPress={this.handleLink}>
        <Text style={[style, {color: color || 'white'}]}>{label || children}</Text>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(Link);
