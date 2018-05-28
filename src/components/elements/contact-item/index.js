import React, {Component} from 'react';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native';

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

  render() {
    const {checked, onCheckboxPress, onLongPress} = this.props;

    return (
      <TouchableOpacity onLongPress={onLongPress}>
        <Contact>
          {/* <Checkbox checked={checked} style={ChatChosen} onPress={onCheckboxPress} /> */}
          <ContactImage>
            <AvatarIcon/>
          </ContactImage>
          <ContactBody>
            <ContactName>
              Gomer Simpson
            </ContactName>
            <ContactMessage>
              online
            </ContactMessage>
          </ContactBody>
        </Contact>
      </TouchableOpacity>
    );
  }
}

export default connect()(ContactItem);