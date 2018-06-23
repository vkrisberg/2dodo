import React, {Component} from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {MainLayout, BackgroundLayout} from '../../../components/layouts';
import {ContactList} from '../../../components/lists';
import {SearchInput, Navbar, ContactSearchItem, ButtonBack, TextLabel} from '../../../components/elements';
import {contactActions} from '../../../store/actions';
import {colors} from '../../../styles';
import styles from './styles';

import IMG_QR_ICON from './img/qr.png';

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

  goQrScanner = () => {
  };

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
      <ContactSearchItem
        item={item}
        onPress={this.onContactPress(item)}
        onCheckboxPress={() => this.onCheckboxPress(item)}
      />
    );
  };

  renderContacts = (_styles) => {
    const {contact} = this.props;
    const {theme} = this.props.account.user;

    if (!contact.searchList || !contact.searchList.length) {
      return (
        <View style={_styles.emptyContainer}>
          <TouchableOpacity onPress={this.goQrScanner}>
            <View style={_styles.emptyWrapper}>
              <Image source={IMG_QR_ICON}/>
              <TextLabel style={_styles.text}
                         color={colors[theme].blackText}>{this.context.t('AddContactQrCode')}</TextLabel>
            </View>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <ContactList context={this.context} items={contact.searchList} renderItem={this.renderContactItem}/>
    );
  };

  render() {
    const {account} = this.props;
    const {theme} = this.props.account.user;
    const _styles = styles(theme);

    return (
      <MainLayout netOffline={!account.net.connected}>
        <BackgroundLayout theme={account.user.theme} paddingHorizontal={10}>
          <Navbar renderTitle={this.context.t('AddContact')}
                  renderLeft={<ButtonBack/>}/>
          <SearchInput placeholder={this.context.t('AddContactPlaceholder')} onChange={this.onSearchChange}/>
          {this.renderContacts(_styles)}
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  account: state.account,
  contact: state.contact,
}))(ContactAdd);
