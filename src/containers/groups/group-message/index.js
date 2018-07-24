import React, {Fragment, PureComponent} from 'react';
import {Platform, View, KeyboardAvoidingView, Alert} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {MainLayout, BackgroundLayout} from '../../../components/layouts';
import {NavbarChat, MessageListItem, MessageInput, Loader} from '../../../components/elements';
import {chatMessageActions, groupActions, groupMessageActions} from '../../../store/actions';
import {MessageList} from '../../../components/lists';
import styles from './styles';
import {messageEnum, routeEnum} from '../../../enums';

class GroupMessage extends PureComponent {

  static propTypes = {
    account: PropTypes.object,
    group: PropTypes.object,
    groupMessage: PropTypes.object,
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

    this.group = {};
    this.timer = null;
  }

  componentDidMount() {
    this.group = this.props.navigation.getParam('group');
    this.props.dispatch(groupActions.setCurrentGroup(this.group));
    this.props.dispatch(groupMessageActions.loadList(this.group.id));
  }

  onBack = () => {
    this.props.navigation.goBack();
  };

  onNavbarAvatarPress = () => {};

  onMessagePress = (message) => {
    this.setState({
      quote: message,
      // quote: {
      //   name: message.username,
      //   text: message.text,
      // },
    });
  };

  onMessageLongPress = (message) => {};

  onQuotePress = () => {
    this.setState({
      quote: null,
    });
  };

  onUserAvatarPress = (data) => {
    if (typeof data === 'string') {
      this.props.navigation.navigate(routeEnum.ContactAdd, {username: data});
    } else {
      this.props.navigation.navigate(routeEnum.ContactProfile, {data: data});
    }
  };

  sendGroupMessage = ({groupId, link, data}) => {
    return this.props.dispatch(groupMessageActions.send({groupId, link, data}));
  };

  onSubmitText = (text) => {
    const currentGroup = this.props.group.current;

    this.sendGroupMessage({
      groupId: currentGroup.id,
      link: currentGroup.link,
      data: text,
    }).then(() => {
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
        groupChat={true}
        onPress={this.onMessagePress}
        onLongPress={this.onMessageLongPress}
        onAvatarPress={this.onUserAvatarPress}/>
    );
  };

  renderMessageList = (theme) => {
    const {context} = this;
    const {account, groupMessage} = this.props;

    return (
      <Fragment>
        <MessageList
          items={groupMessage.list}
          renderItem={this.renderMessage}
          theme={theme}
          showTyping={this.state.showTyping}
          typing={groupMessage.typing}
          context={context}/>
        <MessageInput
          theme={theme}
          context={context}
          quote={this.state.quote}
          onPressQuote={this.onQuotePress}
          disabled={!account.net.connected || !account.connected}
          onSubmit={this.onSubmitText}/>
      </Fragment>
    );
  };

  render() {
    const {context} = this;
    const {account, group} = this.props;
    const currentGroup = group.current;
    const {theme} = account.user;
    const _styles = styles(theme);
    const membersCount = (currentGroup.members && Object.keys(currentGroup.members)) || 0;
    const navbarDescription = `${context.t('Users')}: ${membersCount > 0 ? membersCount : 0}`;

    return (
      <MainLayout netOffline={!account.net.connected} wsConnected={account.connected}>
        <BackgroundLayout theme={theme}>
          {group.loading && <Loader/>}
          <View style={_styles.navbarContainer}>
            <NavbarChat
              context={context}
              title={currentGroup.name}
              description={navbarDescription}
              avatar={currentGroup.avatar}
              onAvatarPress={this.onNavbarAvatarPress}
              onBackPress={this.onBack}/>
          </View>
          {
            Platform.OS === 'ios' ?
              <KeyboardAvoidingView style={_styles.container} behavior="padding" enabled>
                {this.renderMessageList(theme)}
              </KeyboardAvoidingView> :
              <KeyboardAvoidingView style={_styles.container} enabled>
                {this.renderMessageList(theme)}
              </KeyboardAvoidingView>
          }
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  account: state.account,
  group: state.group,
  groupMessage: state.groupMessage,
}))(GroupMessage);
