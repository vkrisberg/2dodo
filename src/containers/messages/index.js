import React, {PureComponent} from 'react';
import {ScrollView, Text, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import PropTypes from 'prop-types';

import {chatActions, chatMessageActions, contactActions} from '../../store/actions';
import TabsContainer from '../tabs-container';
import {routeEnum} from '../../enums';
import {FavoritsDotsIcon, EmptyMessagesIcon, AddIcon} from '../../components/icons';
import {Button, SearchInput} from '../../components/elements';
import {
  Header,
  StyledTitle,
  TitleContainer,
  AddContact,
  StyledIcon,
  EmptyFavoritsView,
  BoldText
} from './styles';

class Messages extends PureComponent {

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
    page: 'chatList', // [chatList, createChat]
  };

  componentDidMount() {
    const {account} = this.props;

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
    //     // this.deleteChat(chat.id);
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

  searchChats = (text) => {
    const filter = `name CONTAINS[c] '${text}' OR shortName CONTAINS[c] '${text}' OR owner CONTAINS[c] '${text}'`;
    return this.loadChatList(filter);
  };

  onCreate = () => {
    this.setState({
      page: 'createChat',
    });
  };

  onSelect(chat) {
    return () => {
      this.props.navigation.navigate(routeEnum.PrivateChat, {chat});
    }
  };

  onSelectContact(contact) {
    return () => {
      this.createChat([contact]).then((chat) => {
        this.props.navigation.navigate(routeEnum.PrivateChat, {chat});
      });
    };
  }

  getChatList = () => {
    const {chat} = this.props;

    if (!chat.list.length) {
      return (
        <EmptyFavoritsView>
          <EmptyMessagesIcon/>
          <BoldText>Your have not chats yet</BoldText>
        </EmptyFavoritsView>
      );
    }

    return chat.list.map((item, index) => {
      return (
        <Button key={index} onPress={this.onSelect(item)} color={'black'}>
          <Text>{item.shortName} - {item.name} - {item.owner}</Text>
        </Button>
      );
    });
  };

  getCreateChat = () => {
    const {contact} = this.props;

    const contacts = contact.list.map((item, index) => {
        return (
          <Button key={index} onPress={this.onSelectContact(item)} color={'black'}>
            <Text>{item.username} {item.firstName} {item.secondName}</Text>
          </Button>
        );
      }
    );

    return (
      <ScrollView>
        {contacts}
      </ScrollView>
    );
  };

  render() {
    const {page} = this.state;

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
          <TouchableWithoutFeedback onPress={this.onCreate}>
            <AddContact>
                <AddIcon/>
            </AddContact>
          </TouchableWithoutFeedback>
        </Header>
        <SearchInput placeholder="Search in chats" onChange={this.searchChats}/>
        {page === 'chatList' && this.getChatList()}
        {page === 'createChat' && this.getCreateChat()}
      </TabsContainer>
    );
  }
}

export default connect(state => ({
  account: state.account,
  chat: state.chat,
  chatMessage: state.chatMessage,
  contact: state.contact,
}))(withNavigation(Messages));
