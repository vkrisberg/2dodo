import React, {PureComponent} from 'react';
import {TouchableWithoutFeedback} from 'react-native';

import {chatActions, chatMessageActions} from '../../store/actions';
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

export default class Messages extends PureComponent {
  componentDidMount() {

  }

  loadChatList = () => {
    return this.props.dispatch(chatActions.loadList());
  };

  createChat = async (contacts) => {
    return this.props.dispatch(chatActions.create(contacts));
  };

  loadChatMessages = () => {
    return this.props.dispatch(chatMessageActions.loadList());
  };

  sendChatMessage = ({data, contacts, timeDead}) => {
    return this.props.dispatch(chatMessageActions.send({data, contacts, timeDead}));
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
