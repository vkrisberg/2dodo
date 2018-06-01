import React, {Component} from 'react';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

import Checkbox from '../checkbox';
import {AvatarIcon} from '../../icons';
import {
  Contact,
  ContactChosen,
  ContactImage,
  ContactBody,
  ContactName,
  ContactMessage
} from './styles';

class ContactItem extends Component {

  static propTypes = {
    contact: PropTypes.object.isRequired,
    checked: PropTypes.bool,
    onCheckboxPress: PropTypes.func,
    onLongPress: PropTypes.func,
  };

  render() {
    const {contact, checked, onCheckboxPress, onLongPress} = this.props;
    const name = contact.firstName || contact.secondName
      ? `${contact.firstName} ${contact.secondName}`
      : contact.username;

    return (
      <TouchableOpacity onLongPress={onLongPress}>
        <Contact>
          {/* <Checkbox checked={checked} style={ChatChosen} onPress={onCheckboxPress} /> */}
          <ContactImage>
            <AvatarIcon/>
          </ContactImage>
          <ContactBody>
            <ContactName>
              {name}
            </ContactName>
            <ContactMessage>
              {contact.username}
            </ContactMessage>
          </ContactBody>
        </Contact>
      </TouchableOpacity>
    );
  }
}

export default connect()(ContactItem);
