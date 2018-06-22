import React, {Component} from 'react';
import {TouchableWithoutFeedback, TouchableOpacity, KeyboardAvoidingView, Text, View, Image} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Wrapper from '../../../components/layouts/wrapper';
import {ContactList} from '../../../components/lists';
import {SearchInput, ContactListItem} from '../../../components/elements';
import {ArrowIcon} from '../../../components/icons';
import {contactActions} from '../../../store/actions';
import styles from '../styles';
import QrIcon from './img/qr.png';

class ContactAdd extends Component {
  static propTypes = {
    account: PropTypes.object,
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  state = {
    value: '',
  };

  constructor(props) {
    super(props);
    this.searchTimerId = null;
  }

  goBack = () => this.props.navigation.goBack();

  goQrScanner = () => {};

  addContact = (data) => {
    if (!data.nickname || !data.username) {
      return;
    }

    this.props.dispatch(contactActions.create(data)).then(() => {
      this.goBack();
    });
  };

  onSearchChange = (value) => {
    if (this.searchTimerId) {
      clearTimeout(this.searchTimerId);
    }

    this.searchTimerId = setTimeout(() => {
      this.props.dispatch(contactActions.search(value));
    }, 500);
  };

  onContactPress(item) {
    return () => {
      this.addContact(item);
    };
  }

  renderContactItem = ({item}) => {
    return (
      <ContactListItem
        item={item}
        onPress={this.onContactPress(item)}
        onCheckboxPress={() => this.onCheckboxPress(item)}
      />
    );
  };

  renderContacts = (_styles) => {
    const {contact} = this.props;

    if (!contact.searchList || !contact.searchList.length) {
      return (
        <TouchableWithoutFeedback onPress={this.goQrScanner}>
          <View style={_styles.infoBlock}>
            <Image source={QrIcon}/>
            <Text style={_styles.infoText}>{this.context.t('AddContactQrCode')}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }

    return (
      <ContactList context={this.context} items={contact.searchList} renderItem={this.renderContactItem}/>
    );
  };

  render() {
    const {context} = this;
    const {theme} = this.props.account.user;
    const _styles = styles(theme);

    return (
      <Wrapper scrolled>
        <View style={_styles.header}>
          <View style={_styles.titleContainer}>
            <TouchableOpacity onPress={this.goBack}>
              <ArrowIcon/>
            </TouchableOpacity>
            <Text style={_styles.styledTitle}>
              {context.t('AddContact')}
            </Text>
          </View>
        </View>
        <View style={_styles.body}>
          <SearchInput placeholder={context.t('AddContactPlaceholder')} onChange={this.onSearchChange}/>
          <View style={_styles.content}>
            {this.renderContacts(_styles)}
          </View>
        </View>
      </Wrapper>
    );
  }
}

export default connect(state => ({
  account: state.account,
  contact: state.contact,
}))(ContactAdd);
