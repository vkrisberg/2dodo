import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

import {ContactsEmptyIcon} from '../../icons/index';
import {ContactListItem} from '../../elements/index';
import {themeEnum} from '../../../enums';
import styles from './styles';

export default class ContactsList extends Component {

  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onContactPress: PropTypes.func,
    theme: PropTypes.string,
    context: PropTypes.object,
  };

  static defaultProps = {
    theme: themeEnum.light,
  };

  state = {
    chosenContacts: [],
  };

  componentDidMount() {
    return null;
  }

  onCheckboxPress = (contact) => {
    const {chosenContacts} = this.state;

    if (this.isChatChosen(message)) {
      this.setState({chosenMessage: chosenContacts.filter(item => item !== contact)});
    }

    this.setState({chosenMessage: [...chosenContacts, contact]});
  };

  isContactChosen = (contact) => {
    return this.state.chosenContacts.find(item => item === contact);
  };

  onContactPress(contact) {
    return () => {
      this.props.onContactPress && this.props.onContactPress(contact);
    };
  }

  render() {
    const {contacts, theme, context} = this.props;
    const _styles = styles(theme);

    if (contacts.length) {
      return (
        <View style={_styles.wrapper}>
          <Text style={_styles.caption}>{`${context.t('SearchResults')} (${contacts.length})`}</Text>
          <Fragment>
            {
              contacts.map((contact, index) => (
                <ContactListItem
                  key={index}
                  contact={contact}
                  checked={this.isContactChosen(contact)}
                  onPress={this.onContactPress(contact)}
                  onCheckboxPress={() => this.onCheckboxPress(contact)}
                />
              ))
            }
          </Fragment>
        </View>
      );
    }

    return (
      <View style={_styles.emptyContactsView}>
        <ContactsEmptyIcon/>
        <Text style={_styles.text}>{context.t('NoContacts')}</Text>
      </View>
    );
  }
}
