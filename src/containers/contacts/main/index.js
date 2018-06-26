import React, {Component} from 'react';
import {TouchableOpacity, Text, View, Modal} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {MainLayout, BackgroundLayout} from '../../../components/layouts';
import {ContactList} from '../../../components/lists';
import {Navbar, SearchInput, NavbarDots, ButtonNavbar, ButtonAdd, ContactListItem} from '../../../components/elements';
import {contactActions} from '../../../store/actions';
import {routeEnum} from '../../../enums';

const list = [
  {
    title: 'Me',
    data: [
      {
        username: 'Bart Simpson',
      }
    ],
  },
  {
    title: 'A',
    data: [
      {
        username: 'Anna'
      },
      {
        username: 'Alla'
      },
    ],
  },
  {
    title: 'B',
    data: [
      {
        username: 'Bady'
      }
    ],
  },
];

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
    this.loadContactList().then(() => {
      this.getOnlineUsers();
    });
  }

  loadContact = (username) => {
    return this.props.dispatch(contactActions.loadOne(username));
  };

  loadContactList = (filter, sort, descending) => {
    return this.props.dispatch(contactActions.loadList(filter, sort, descending));
  };

  getOnlineUsers = (usernames) => {
    return this.props.dispatch(contactActions.getOnlineUsers(usernames));
  };

  searchContacts = (text) => {
    const filter = `username CONTAINS[c] '${text}' OR firstName CONTAINS[c] '${text}' OR secondName CONTAINS[c] '${text}'`;
    return this.loadContactList(filter);
  };

  updateContact = (data) => {
    return this.props.dispatch(contactActions.update(data));
  };

  deleteContact = (username) => {
    return this.props.dispatch(contactActions.delete(username));
  };

  onSearchChange = (text) => {
    this.searchContacts(text);
  };

  onCreate = () => {
    this.props.navigation.navigate(routeEnum.ContactAdd);
  };

  onUpdate = (username) => {
    this.loadContact(username).then(() => {
      // TODO: show contact updating form
    });
  };

  onDelete = (username) => {
    // TODO: show contact deleting confirmation form
    // this.deleteContact(username);
  };

  renderNavbarButton = () => {
    const {editMode} = this.state;

    if (editMode) {
      return (
        <ButtonNavbar position="right" onPress={this.onDelete}>{this.context.t('Delete')}</ButtonNavbar>
      );
    }

    return <ButtonAdd onPress={this.onCreate}/>;
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
                  renderRight={this.renderNavbarButton()}/>
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
