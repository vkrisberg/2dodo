import React, {PureComponent} from 'react';
import {View, ScrollView, Text, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import PropTypes from 'prop-types';

import {chatActions, chatMessageActions, contactActions} from '../../store/actions';
import TabsContainer from '../tabs-container';
import {routeEnum} from '../../enums';
import {FavoritsDotsIcon, EmptyMessagesIcon, AddIcon} from '../../components/icons';
import {Input, Button, SearchInput} from '../../components/elements';
import {
  Header,
  StyledTitle,
  TitleContainer,
  AddContact,
  StyledIcon,
  EmptyFavoritsView,
  BoldText,
  SendMessageView,
} from './styles';

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

  state = {
    text: '',
  };

  componentDidMount() {
    const currentChat = this.props.navigation.getParam('chat');
    this.chatId = currentChat.id;
    this.props.dispatch(chatActions.setCurrentChat(currentChat));
    this.loadChatMessages(this.chatId);
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

  onTextChange = (text) => {
    this.setState({text});
  };

  onTextSubmit = () => {
    const {account} = this.props;
    const messageData = {
      username: account.user.username,
      text: this.state.text,
    };

    this.sendChatMessage({data: messageData, chatId: this.chatId}).then(() => {
      this.setState({text: ''});
    });
  };

  searchMessages = (text) => {
    const filter = `text CONTAINS[c] '${text}' OR username CONTAINS[c] '${text}'`;
    return this.loadChatMessages(this.chatId, filter);
  };

  getMessages = () => {
    const {chatMessage} = this.props;
    const messages = chatMessage.list.map((item, index) => {
      return (
        <Text key={index}>{item.username} - {item.text}</Text>
      );
    });

    return (
      <ScrollView>
        {messages}
      </ScrollView>
    );
  };

  render() {
    const {chat} = this.props;
    const input = {
      value: this.state.text,
      onChange: this.onTextChange,
    };

    return (
      <TabsContainer selected={routeEnum.Messages}>
        <Header>
          <TitleContainer>
            <StyledIcon>
              <FavoritsDotsIcon/>
            </StyledIcon>
            <StyledTitle>
              {chat.current.name}
            </StyledTitle>
          </TitleContainer>
          <AddContact>
            <TouchableWithoutFeedback>
              <AddIcon/>
            </TouchableWithoutFeedback>
          </AddContact>
        </Header>
        <SearchInput placeholder="Search in messages" onChange={this.searchMessages}/>
        {this.getMessages()}
        <SendMessageView>
          <Input input={input} focusedColor={'gray'}/>
          <Button onPress={this.onTextSubmit} color={'black'}>Отправить</Button>
        </SendMessageView>
      </TabsContainer>
    );
  }
}

export default connect(state => ({
  account: state.account,
  chat: state.chat,
  chatMessage: state.chatMessage,
  contact: state.contact,
}))(withNavigation(PrivateChat));
