import React, {PureComponent} from 'react';
import {View, ScrollView, Text, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {MainLayout, BackgroundLayout} from '../../../components/layouts';
import {NavbarChat, SearchInput, MessageListItem, MessageInput} from '../../../components/elements';
import {chatActions, chatMessageActions, contactActions} from '../../../store/actions';
import {MessageList} from '../../../components/lists';
import styles from './styles';

class ChatMessage extends PureComponent {

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

  constructor(props) {
    super(props);

    this.chat = {};
  }

  componentDidMount() {
    this.chat = this.props.navigation.getParam('chat');
    this.props.dispatch(chatActions.setCurrentChat(this.chat));
    this.loadChatMessages(this.chat.id);
    this.loadContactList();
  }

  componentWillUnmount() {
    this.props.dispatch(chatActions.setCurrentChat({}, true));
  }

  loadContactList = (filter, sort, descending) => {
    return this.props.dispatch(contactActions.loadList(filter, sort, descending));
  };

  loadChatMessages = (chatId, filter, sort, descending) => {
    return this.props.dispatch(chatMessageActions.loadList(chatId, filter, sort, descending));
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

  goBack = () => this.props.navigation.goBack();

  onSearchChange = (text) => {
    const filter = `text CONTAINS[c] '${text}' OR username CONTAINS[c] '${text}'`;
    return this.loadChatMessages(this.chat.id, filter);
  };

  onMessagePress = (message) => {
    // console.log('onMessagePress', message);
  };

  onSubmitText = (text) => {
    const {account} = this.props;
    const messageData = {
      username: account.user.username,
      text,
    };

    this.sendChatMessage({data: messageData, chatId: this.chat.id}).then(() => {
      this.setState({text: ''});
    });
  };

  renderMessage = ({item}) => {
    return (
      <MessageListItem item={item} onPress={this.onMessagePress}/>
    );
  };

  render() {
    const {account, chat, chatMessage} = this.props;
    const {theme} = account.user;

    return (
      <MainLayout netOffline={!account.net.connected} wsConnected={account.connected}>
        <BackgroundLayout theme={theme} paddingHorizontal={10}>
          <NavbarChat title={chat.current.name} description={'online'} context={this.context}/>
          <SearchInput placeholder="Search in messages" onChange={this.onSearchChange}/>
          <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <MessageList
              items={chatMessage.list}
              verticalOffset={116}
              renderItem={this.renderMessage}
              theme={account.user.theme}
              context={this.context}/>
            <MessageInput
              theme={theme}
              context={this.context}
              disabled={!account.net.connected}
              onSubmit={this.onSubmitText}/>
          </KeyboardAvoidingView>
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
}))(ChatMessage);
