import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {MainLayout, BackgroundLayout} from '../../../components/layouts';
import {ContactList} from '../../../components/lists';
import {SearchInput, Navbar, ContactListItem, ButtonBack} from '../../../components/elements';
import {chatActions, contactActions} from '../../../store/actions';

class ChatCreate extends Component {

  static propTypes = {
    account: PropTypes.object,
    contact: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({navigate: PropTypes.func}),
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.loadContactList();
  }

  loadContactList = (filter, sort, descending) => {
    return this.props.dispatch(
      contactActions.loadList(filter, sort, descending)
    );
  };

  searchContacts = (text) => {
    const filter = `username CONTAINS[c] '${text}' OR firstName CONTAINS[c] '${text}' OR secondName CONTAINS[c] '${text}'`;
    return this.loadContactList(filter);
  };

  createChat = (contacts) => {
    return this.props.dispatch(
      chatActions.create(contacts)
    );
  };

  goBack = () => this.props.navigation.goBack();

  onSearchChange = (text) => {
    this.searchContacts(text);
  };

  onCreateChat = (contact) => {
    this.createChat([contact]).then((chat) => {
      this.goBack();
      // this.props.navigation.navigate(routeEnum.ChatMessage, {chat});
    });
  };

  renderContactItem = ({item}) => {
    return (
      <ContactListItem
        item={item}
        onPress={this.onCreateChat}
      />
    );
  };

  render() {
    const {account, contact} = this.props;

    return (
      <MainLayout netOffline={!account.net.connected}>
        <BackgroundLayout theme={account.user.theme} paddingHorizontal={10}>
          <Navbar renderTitle={this.context.t('CreateChat')}
                  renderLeft={<ButtonBack/>}/>
          <SearchInput placeholder="Search in chats" onChange={this.searchChats}/>
          <ContactList context={this.context}
                       items={contact.list}
                       renderItem={this.renderContactItem}/>
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  account: state.account,
  contact: state.contact,
}))(ChatCreate);
