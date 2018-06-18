import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {isEmpty, map} from 'lodash';

import {MainLayout, BackgroundLayout} from '../../../components/layouts';
import {ChatList} from '../../../components/lists';
import {SearchInput, Navbar, NavbarDots, ButtonAdd, ChatListItem, ButtonNavbar} from '../../../components/elements';
import {chatActions, chatMessageActions, contactActions} from '../../../store/actions';
import {routeEnum} from '../../../enums';

class Messages extends Component {

  static propTypes = {
    account: PropTypes.object,
    chat: PropTypes.object,
    chatMessage: PropTypes.object,
    contact: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({navigate: PropTypes.func}),
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  state = {
    editMode: false,
    selected: {},
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadChatList();
    this.loadContactList();
    // TODO - remove after tests
    // const {account} = this.props;
    // this.loadChatMessages();
    // this.loadContactList().then((contactList) => {
    //   const contacts = [contactList[0]];
    //   this.createChat(contacts).then((chat) => {
    //     // chat.name = 'New Chat';
    //     // this.updateChat(chat);
    //     // this.deleteChatById(chat.id);
    //     const messageData = {
    //       username: account.user.username,
    //       text: 'Hello World!',
    //     };
    //     this.sendChatMessage({data: messageData, chatId: chat.id}).then((message) => {
    //       // this.resendChatMessage(message.id);
    //       // message.text = 'Text Modified!!!';
    //       // this.editChatMessage(message);
    //       // this.deleteChatMessage(message.id);
    //     });
    //   });
    // });
  }

  loadContactList = (filter, sort, descending) => {
    return this.props.dispatch(contactActions.loadList(filter, sort, descending));
  };

  loadChatList = (filter, sort, descending) => {
    return this.props.dispatch(chatActions.loadList(filter, sort, descending));
  };

  createChat = async (contacts) => {
    return this.props.dispatch(chatActions.create(contacts));
  };

  updateChat = async (data) => {
    return this.props.dispatch(chatActions.update(data));
  };

  deleteChatById = async (id) => {
    return this.props.dispatch(chatActions.deleteById(id));
  };

  deleteChats = async (ids) => {
    return this.props.dispatch(chatActions.delete(ids));
  };

  loadChatMessages = () => {
    return this.props.dispatch(chatMessageActions.loadList());
  };

  sendChatMessage = ({data, chatId, timeDead}) => {
    return this.props.dispatch(chatMessageActions.send({data, chatId, timeDead}));
  };

  resendChatMessage = (id, timeDead) => {
    return this.props.dispatch(chatMessageActions.resend(id, timeDead));
  };

  editChatMessage = (data) => {
    return this.props.dispatch(chatMessageActions.edit(data));
  };

  deleteChatMessage = (id) => {
    return this.props.dispatch(chatMessageActions.delete(id));
  };

  searchChats = (text) => {
    const filter = `name CONTAINS[c] '${text}' OR shortName CONTAINS[c] '${text}' OR owner CONTAINS[c] '${text}'`;
    return this.loadChatList(filter);
  };

  onCreate = () => {
    this.props.navigation.navigate(routeEnum.ChatCreate);
  };

  onChatPress = (chat) => {
    if (this.state.editMode) {
      this.onChatCheckboxPress(chat);
      return;
    }

    this.props.navigation.navigate(routeEnum.ChatMessage, {chat});
  };

  onChatLongPress = (chat) => {
    if (!this.state.editMode) {
      this.setState({
        selected: {[chat.id]: chat},
        editMode: true,
      });
    }
  };

  onChatCheckboxPress = (chat) => {
    if (this.state.editMode) {
      const selected = {...this.state.selected};

      if (!selected[chat.id]) {
        selected[chat.id] = chat;
      } else {
        delete selected[chat.id];
      }

      if (isEmpty(selected)) {
        this.setState({
          editMode: false,
          selected: {},
        });
        return;
      }

      this.setState({selected});
    }
  };

  onChatsDelete = () => {
    const chatIds = map(this.state.selected, (item, key) => key);
    if (chatIds.length) {
      this.deleteChats(chatIds).then(() => {
        this.setState({
          editMode: false,
          selected: {},
        });
      });
    }
  };

  renderChatItem = ({item}) => {
    const {account} = this.props;

    return (
      <ChatListItem item={item}
                    theme={account.user.theme}
                    context={this.context}
                    editMode={this.state.editMode}
                    selectedItems={this.state.selected}
                    onPress={this.onChatPress}
                    onLongPress={this.onChatLongPress}
                    onCheckboxPress={this.onChatCheckboxPress}/>
    );
  };

  renderNavbarButton = () => {
    const {editMode} = this.state;

    if (editMode) {
      return (
        <ButtonNavbar position="right" onPress={this.onChatsDelete}>{this.context.t('Delete')}</ButtonNavbar>
      );
    }

    return <ButtonAdd onPress={this.onCreate}/>;
  };

  render() {
    const {account, chat} = this.props;
    const {theme} = account.user;

    return (
      <MainLayout netOffline={!account.net.connected}>
        <BackgroundLayout theme={theme} paddingHorizontal={10}>
          <Navbar renderTitle={this.context.t('Messages')}
                  renderLeft={<NavbarDots/>}
                  renderRight={this.renderNavbarButton()}/>
          <SearchInput placeholder="Search in chats" onChange={this.searchChats}/>
          <ChatList theme={theme}
                    context={this.context}
                    items={chat.list}
                    renderItem={this.renderChatItem}/>
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  account: state.account,
  chat: state.chat,
  chatMessage: state.chatMessage,
  contact: state.contact,
}))(Messages);
