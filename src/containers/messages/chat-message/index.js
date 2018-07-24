import React, {PureComponent} from 'react';
import {View, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {MainLayout, BackgroundLayout, DismissKeyboardLayout} from '../../../components/layouts';
import {NavbarChat, SearchInput, MessageListItem, MessageInput} from '../../../components/elements';
import {chatActions, chatMessageActions, contactActions} from '../../../store/actions';
import {MessageList} from '../../../components/lists';
import styles from './styles';
import {routeEnum} from '../../../enums';

const TYPING_SHOW_TIMEOUT = 3000;

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

    this.state = {
      quote: null,
      showTyping: false,
    };

    this.chat = {};
    this.timer = null;
  }

  componentDidMount() {
    this.chat = this.props.navigation.getParam('chat');
    this.props.dispatch(chatMessageActions.clearMessages()).then(() => {
      this.props.dispatch(chatActions.setCurrentChat(this.chat));
      this.props.dispatch(contactActions.getOnlineUsers());
      this.loadChatMessages(this.chat.id).then(() => {
        // send read status
        this.props.dispatch(chatMessageActions.sendMessagesRead(this.chat));
      });
    });
  }

  componentDidUpdate(prevProps) {
    const {chatMessage} = this.props;
    if (chatMessage.typing.date && prevProps.chatMessage.typing.date !== chatMessage.typing.date) {
      this.setState({showTyping: true});
      setTimeout(() => {
        this.setState({showTyping: false});
      }, TYPING_SHOW_TIMEOUT);
    }
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

  onBack = () => {
    this.props.dispatch(chatActions.unsetCurrentChat());
    this.props.navigation.goBack();
  };

  onSearchChange = (text) => {
    const filter = `text CONTAINS[c] '${text}' OR username CONTAINS[c] '${text}'`;
    return this.loadChatMessages(this.chat.id, filter);
  };

  onNavbarAvatarPress = () => {
    const {contact} = this.props;
    this.props.navigation.navigate(routeEnum.ContactProfile, {data: contact.current});
  };

  onMessageTyping = () => {
    this.props.dispatch(chatMessageActions.sendMessageTyping(this.chat));
  };

  onMessagePress = (message) => {
    this.setState({
      quote: message,
      // quote: {
      //   name: message.username,
      //   text: message.text,
      // },
    });
  };

  onMessageLongPress = (message) => {
  };

  onQuotePress = () => {
    this.setState({
      quote: null,
    });
  };

  onSubmitText = (text) => {
    const {account} = this.props;
    const messageData = {
      username: account.user.username,
      quote: this.state.quote ? JSON.stringify(this.state.quote) : null,
      text,
    };

    this.sendChatMessage({data: messageData, chatId: this.chat.id}).then(() => {
      this.setState({quote: null});
    });
  };

  renderMessage = ({item}) => {
    const {theme} = this.props.account.user;

    return (
      <MessageListItem
        theme={theme}
        context={this.context}
        item={item}
        onPress={this.onMessagePress}
        onLongPress={this.onMessageLongPress}/>
    );
  };

  render() {
    const {account, chat, chatMessage, contact} = this.props;
    const {theme} = account.user;
    const navbarDescription = contact.current.isOnline ? this.context.t('online') : this.context.t('offline');

    return (
      <MainLayout netOffline={!account.net.connected} wsConnected={account.connected}>
        <BackgroundLayout theme={theme}>
          <NavbarChat context={this.context}
                      title={chat.current.name}
                      description={navbarDescription}
                      avatar={chat.current.avatar}
                      onAvatarPress={this.onNavbarAvatarPress}
                      onBackPress={this.onBack}/>
          <DismissKeyboardLayout style={styles.fullWrap}>
            <View style={styles.searchInputContainer}>
              <SearchInput placeholder="Search in messages" onChange={this.onSearchChange}/>
            </View>
            <KeyboardAvoidingView style={styles.container} enabled>
              <MessageList
                items={chatMessage.list}
                renderItem={this.renderMessage}
                theme={account.user.theme}
                showTyping={this.state.showTyping}
                style={{paddingHorizontal: 0}}
                typing={this.props.chatMessage.typing}
                context={this.context}/>
              <MessageInput
                theme={theme}
                context={this.context}
                quote={this.state.quote}
                onPressQuote={this.onQuotePress}
                disabled={!account.net.connected || !account.connected}
                onSubmit={this.onSubmitText}
                onTyping={this.onMessageTyping}/>
            </KeyboardAvoidingView>
          </DismissKeyboardLayout>
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
