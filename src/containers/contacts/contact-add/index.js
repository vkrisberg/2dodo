import React, {Component} from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {MainLayout, BackgroundLayout, HideWrapper} from '../../../components/layouts';
import {ContactList} from '../../../components/lists';
import {SearchInput, Navbar, ContactSearchItem, ButtonBack, TextLabel} from '../../../components/elements';
import {chatActions, contactActions} from '../../../store/actions';
import {helpers} from '../../../utils';
import {colors} from '../../../styles';
import styles from './styles';

import IMG_QR_ICON from './img/qr.png';

class ContactAdd extends Component {
  static propTypes = {
    account: PropTypes.object,
    contact: PropTypes.object,
    navigation: PropTypes.shape({navigate: PropTypes.func}),
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  state = {
    value: '',
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const searchUser = this.props.navigation.getParam('username');
    if (searchUser) {
      this.props.dispatch(contactActions.search(helpers.getLogin(searchUser)));
    }
  }

  componentWillUnmount() {
    this.props.dispatch(contactActions.clearSearchList());
  }

  goQrScanner = () => {
  };

  addContact = (data) => {
    if (!data.nickname || !data.username) {
      return;
    }

    this.props.dispatch(contactActions.create(data)).then((result) => {
      this.props.dispatch(contactActions.requestProfile(result.username));
      this.props.dispatch(chatActions.loadList());
      this.props.navigation.goBack();
    });
  };

  onSearchChange = (value) => {
    this.props.dispatch(contactActions.search(value));
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
        context={this.context}
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
        <HideWrapper style={{flex: 1}}>
          <View style={_styles.emptyContainer}>
            <TouchableOpacity onPress={this.goQrScanner}>
              <View style={_styles.emptyWrapper}>
                <Image source={IMG_QR_ICON}/>
                <TextLabel style={_styles.text}
                           color={colors[theme].blackText}>{this.context.t('AddContactQrCode')}</TextLabel>
              </View>
            </TouchableOpacity>
          </View>
        </HideWrapper>
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
    const searchInputValue = this.props.navigation.getParam('username');

    return (
      <MainLayout netOffline={!account.net.connected} wsConnected={account.connected}>
        <BackgroundLayout theme={account.user.theme} paddingHorizontal={10}>
          <Navbar renderTitle={this.context.t('AddContact')}
                  renderLeft={<ButtonBack/>}/>
          <SearchInput value={searchInputValue ? helpers.getLogin(searchInputValue) : ''} placeholder={this.context.t('AddContactPlaceholder')} onChange={this.onSearchChange}/>
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
