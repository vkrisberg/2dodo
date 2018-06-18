import React, {Component} from 'react';
import {connect} from 'react-redux';
import {TouchableOpacity, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import Checkbox from '../checkbox-svg';
import {AvatarIcon} from '../../icons';
import {themeEnum} from '../../../enums';
import styles from './styles';

class ContactListItem extends Component {

  static propTypes = {
    contact: PropTypes.object.isRequired,
    checked: PropTypes.bool,
    onCheckboxPress: PropTypes.func,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    theme: PropTypes.string,
  };

  static defaultProps = {
    theme: themeEnum.light,
  };

  render() {
    const {contact, checked, onCheckboxPress, onPress, onLongPress, theme} = this.props;
    const _styles = styles(theme);

    return (
      <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={{width: '100%'}}>
        <View style={_styles.wrapper}>
          {/* <Checkbox checked={checked} style={ChatChosen} onPress={onCheckboxPress} /> */}
          <View style={_styles.image}>
            <AvatarIcon/>
          </View>
          <View style={_styles.body}>
            <Text style={_styles.name}>
              {contact.username}
            </Text>
            <Text>
              {moment(contact.dateUpdate).format('DD.MM.YY')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect()(ContactListItem);
