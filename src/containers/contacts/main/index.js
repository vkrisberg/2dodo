import React, {Component} from 'react';
import {TouchableOpacity, Text, View, Modal, Alert} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {MainLayout, BackgroundLayout} from '../../../components/layouts';
import {ContactList} from '../../../components/lists';
import {Navbar, SearchInput, NavbarDots, ButtonAdd, ContactListItem} from '../../../components/elements';
import {chatActions, contactActions} from '../../../store/actions';
import {routeEnum} from '../../../enums';

class Contacts extends Component {

  static propTypes = {
    contact: PropTypes.object,
    account: PropTypes.object,
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      selected: {},
      chosenContacts: [],
      chosenMessage: [],
      currentLetter: 'A',
    };
  }

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

  onPressChatBtn = (contact) => {
    this.props.dispatch(chatActions.create([contact])).then((chat) => {
      this.props.navigation.navigate(routeEnum.ChatMessage, {chat});
    });
  };

  onPressDeleteBtn =(username) => {
    const {context} = this;

    Alert.alert(
      context.t('DeleteContact'),
      context.t('DeleteContactConfirm'),
      [
        {text: context.t('Cancel')},
        {text: context.t('Delete'), onPress: () => {
          this.props.dispatch(contactActions.delete(username)).then(() => {
            this.props.dispatch(chatActions.loadList());
          });
        }}
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
        onPressChatBtn={this.onPressChatBtn}
        onPressDeleteBtn={this.onPressDeleteBtn}
      />
    );
  };

  onPressLetter = (currentLetter) => {
    let index = null;
    const section = this.props.contact.sectionList.find((item, i) => {
      if(item.title === currentLetter) {
        index = i;
        return item;
      }
    });

    if(section) {
      this.setState({currentLetter});
      this.contactList.sectionListRef.scrollToLocation({
        animated: true,
        sectionIndex: index,
        itemIndex: 0,
        viewPosition: 0.5,
      });
    }
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
          <ContactList
            ref={item => (this.contactList = item)}
            context={context}
            items={contact.sectionList}
            renderItem={this.renderContactItem}
            onPressLetter={this.onPressLetter}
            currentLetter={this.state.currentLetter}
            sections/>
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  contact: state.contact,
  account: state.account,
}))(Contacts);
