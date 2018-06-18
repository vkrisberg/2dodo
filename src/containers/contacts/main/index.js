import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {MainLayout, BackgroundLayout} from '../../../components/layouts';
import {contactActions} from '../../../store/actions';
import {Navbar, SearchInput, NavbarDots, NavbarButton, AddButton} from '../../../components/elements';
import {ContactsList} from '../../../components/lists';

const list = [
  {
    username: 'Lisa Simpson',
    dateCreate: '2018-06-14 10:00'
  },
  {
    username: 'Margharet Simpson',
    dateCreate: '2018-06-13 15:00'
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

  updateContact = (data) => {
    return this.props.dispatch(contactActions.update(data));
  };

  deleteContact = (username) => {
    return this.props.dispatch(contactActions.delete(username));
  };

  onSearchChange = (text) => {
    this.searchContacts(text);
  };

  onCreate = (data) => {
    this.props.navigation.navigate('AddContact');
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
        <NavbarButton position="right" onPress={this.onDelete}>{this.context.t('Delete')}</NavbarButton>
      );
    }

    return <AddButton onPress={this.onCreate}/>;
  };

  render() {
    const {context} = this;
    const {contact, account} = this.props;

    return (
      <MainLayout netOffline={!account.net.connected}>
        <BackgroundLayout theme={account.user.theme} paddingHorizontal={10}>
          <Navbar renderTitle={context.t('Contacts')}
            renderLeft={<NavbarDots/>}
            renderRight={this.renderNavbarButton()}/>
          <SearchInput placeholder="Search contacts" onChange={this.onSearchChange}/>
          <ContactsList contacts={list} context={context}/>
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  contact: state.contact,
  account: state.account,
}))(Contacts);
