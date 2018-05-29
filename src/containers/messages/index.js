import React, {PureComponent} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';

import {chatActions, chatMessageActions, contactActions} from '../../store/actions';
import TabsContainer from '../tabs-container';
import {routeEnum} from '../../enums';
import {FavoritsDotsIcon, EmptyMessagesIcon, AddIcon} from '../../components/icons';
import {SearchInput} from '../../components/elements';
import {
  Header,
  StyledTitle,
  TitleContainer,
  AddContact,
  StyledIcon,
  EmptyFavoritsView,
  BoldText
} from './styles';
import {connect} from 'react-redux';

class Messages extends PureComponent {

  static propTypes = {
    account: PropTypes.object,
    chat: PropTypes.object,
    chatMessage: PropTypes.object,
    contact: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.loadChatList();

    // TODO - remove after tests
    const {account} = this.props;
    this.loadChatMessages();
    this.loadContactList().then((contactList) => {
      const contacts = [contactList[0]];
      this.createChat(contacts).then((chat) => {
        // chat.name = 'New Chat';
        // this.updateChat(chat);
        // this.deleteChat(chat.id);
        const messageData = {
          username: account.user.username,
          text: 'Hello World!',
        };
        this.sendChatMessage({data: messageData, chatId: chat.id}).then((message) => {
          // this.resendChatMessage(message.id);
          // message.text = 'Text Modified!!!';
          // this.editChatMessage(message);
          // this.deleteChatMessage(message.id);
        });
      });
      this.loadChatList();
    });
  }

  loadContactList = (filter, sort, descending) => {
    return this.props.dispatch(contactActions.loadList(filter, sort, descending));
  };

  loadChatList = () => {
    return this.props.dispatch(chatActions.loadList());
  };

  createChat = async (contacts) => {
    return this.props.dispatch(chatActions.create(contacts));
  };

  updateChat = async (data) => {
    return this.props.dispatch(chatActions.update(data));
  };

  deleteChat = async (id) => {
    return this.props.dispatch(chatActions.delete(id));
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

  searchFavorite = () => {
  };

  getFavorits = () => {
    return (
      <EmptyFavoritsView>
        <EmptyMessagesIcon/>
        <BoldText>Your have not chats yet</BoldText>
      </EmptyFavoritsView>
    );
  };

  render() {
    return (
      <TabsContainer selected={routeEnum.Messages}>
        <Header>
          <TitleContainer>
            <StyledIcon>
              <FavoritsDotsIcon/>
            </StyledIcon>
            <StyledTitle>
              Messages
            </StyledTitle>
          </TitleContainer>
          <AddContact>
            <TouchableWithoutFeedback onPress={this.searchFavorite}>
              <AddIcon/>
            </TouchableWithoutFeedback>
          </AddContact>
        </Header>
        <SearchInput placeholder="Search in chats"/>
        {this.getFavorits()}
      </TabsContainer>
    );
  }
}

export default connect(state => ({
  account: state.account,
  chat: state.chat,
  chatMessage: state.chatMessage,
  contact: state.contact,
}))(Messages);
