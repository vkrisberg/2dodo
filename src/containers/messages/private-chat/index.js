import React, {PureComponent} from 'react';
import {View, ScrollView, Text, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {chatActions, chatMessageActions, contactActions} from '../../../store/actions';
import Wrapper from '../../../components/layouts/wrapper';
import {ArrowIcon} from '../../../components/icons';
import {Input, Button, SearchInput, MessageListItem, MessageInput} from '../../../components/elements';
import {MessageList} from '../../../components/lists';
import {
  Header,
  StyledTitle,
  TitleContainer,
  MessageStyles,
} from '../styles';

class PrivateChat extends PureComponent {

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
    const {chat, chatMessage} = this.props;

    return (
      <Wrapper scrolled={false}>
        <Header>
          <TitleContainer width="100%">
            <TouchableOpacity onPress={this.goBack}>
              <ArrowIcon/>
            </TouchableOpacity>
            <StyledTitle marginLeft={20}>
              {chat.current.name}
            </StyledTitle>
          </TitleContainer>
        </Header>
        <SearchInput placeholder="Search in messages" onChange={this.onSearchChange}/>
        <KeyboardAvoidingView style={MessageStyles.container} behavior="padding" enabled>
          <MessageList data={chatMessage.list} verticalOffset={116} renderItem={this.renderMessage}/>
          <MessageInput onSubmitText={this.onSubmitText}/>
        </KeyboardAvoidingView>
      </Wrapper>
    );
  }
}

export default connect(state => ({
  account: state.account,
  chat: state.chat,
  chatMessage: state.chatMessage,
  contact: state.contact,
}))(PrivateChat);
