import React, {Component} from 'react';
import {TouchableOpacity, Text, View, Modal, Alert} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {MainLayout, BackgroundLayout} from '../../../components/layouts';
import {ContactList} from '../../../components/lists';
import {Navbar, SearchInput, NavbarDots, ButtonAdd, ContactListItem} from '../../../components/elements';
import {contactActions} from '../../../store/actions';
import {routeEnum} from '../../../enums';

class Contacts extends Component {

  static propTypes = {
    contact: PropTypes.object,
    account: PropTypes.object,
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  state = {
    editMode: false,
    selected: {},
    chosenContacts: [],
    chosenMessage: [],
  };

  componentDidMount() {
    this.loadContactList();
  }

  loadContact = (username) => {
    return this.props.dispatch(contactActions.loadOne(username));
  };

  loadContactList = (filter, sort, descending) => {
    return this.props.dispatch(contactActions.loadList(filter, sort, descending));
  };

  searchContacts = (text) => {
    const filter = `username CONTAINS[c] '${text}' OR firstName CONTAINS[c] '${text}' OR secondName CONTAINS[c] '${text}'`;
    return this.loadContactList(filter);
  };

  onSearchChange = (text) => {
    this.searchContacts(text);
  };

  onCreate = () => {
    this.props.navigation.navigate(routeEnum.ContactAdd);
  };

  onPressDeleteBtn =(username) => {
    const {context} = this;

    Alert.alert(
      context.t('DeleteContact'),
      context.t('DeleteContactConfirm'),
      [
        {text: context.t('Cancel')},
        {text: context.t('Delete'), onPress: () => this.props.dispatch(contactActions.delete(username))}
      ],
      {cancelable: false},
    );
  };

  isContactChosen = (contact) => {
    return this.state.chosenContacts.find(item => item === contact);
  };

  onContactPress = (contact) => {
    this.props.navigation.navigate(routeEnum.ContactProfile, {data: contact});
  };

  onCheckboxPress = (contact) => {
    const {chosenContacts} = this.state;

    if (this.isChatChosen(message)) {
      this.setState({chosenMessage: chosenContacts.filter(item => item !== contact)});
    }

    this.setState({chosenMessage: [...chosenContacts, contact]});
  };

  renderContactItem = ({item}) => {
    return (
      <ContactListItem
        item={item}
        context={this.context}
        checked={this.isContactChosen(item)}
        onPress={() => this.onContactPress(item)}
        onCheckboxPress={() => this.onCheckboxPress(item)}
        onPressDeleteBtn={this.onPressDeleteBtn}
      />
    );
  };

  render() {
    const {context} = this;
    const {contact, account} = this.props;

    return (
      <MainLayout netOffline={!account.net.connected} wsConnected={account.connected}>
        <BackgroundLayout theme={account.user.theme} paddingHorizontal={10}>
          <Navbar renderTitle={context.t('Contacts')}
                  renderLeft={<NavbarDots/>}
                  renderRight={<ButtonAdd onPress={this.onCreate}/>}/>
          <SearchInput placeholder="Search contacts" onChange={this.onSearchChange}/>
          <ContactList context={context} items={contact.sectionList} renderItem={this.renderContactItem} sections/>
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  contact: state.contact,
  account: state.account,
}))(Contacts);
