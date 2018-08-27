import React, {Fragment, PureComponent} from 'react';
import {Platform, View, KeyboardAvoidingView, Alert} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import moment from "moment/moment";

import {MainLayout, BackgroundLayout} from '../../../components/layouts';
import {NavbarChat, MessageListItem, MessageInput, Loader, Button} from '../../../components/elements';
import {groupActions, groupMessageActions} from '../../../store/actions';
import {MessageList} from '../../../components/lists';
import styles from './styles';
import {colors} from '../../../styles';
import {routeEnum} from '../../../enums';

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

    const {theme} = props.account.user;
    this.styles = styles(theme);
    this.group = {};
    this.lastDate = null;
  }

  componentDidMount() {
    this.group = this.props.navigation.getParam('group');
    this.props.dispatch(groupActions.setCurrentGroup(this.group));
    this.props.dispatch(groupMessageActions.loadList(this.group.id));
  }

  onBack = () => {
    this.props.dispatch(groupActions.unsetCurrentGroup());
    this.props.navigation.goBack();
  };

  onNavbarAvatarPress = () => {};

  onMessagePress = (message) => {
    // this.setState({
    //   quote: message,
    // });
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

  onUnsubscribe = (link) => {
    this.props.dispatch(groupActions.unsubscribeFromGroup(link))
      .then(() => {
        this.props.navigation.goBack();
      });
  };

  onSoundMute = () => {};

  renderMessage = ({item, index}) => {
    const {theme} = this.props.account.user;

    const isRenderSeparator = index === 0 || !moment(item.dateCreate).isSame(this.lastDate, 'day');
    this.lastDate = item.dateCreate;

    return (
      <MessageListItem
        theme={theme}
        context={this.context}
        item={item}
        isRenderSeparator={isRenderSeparator}
        groupChat={true}
        onPress={this.onMessagePress}
        onLongPress={this.onMessageLongPress}
        onAvatarPress={this.onUserAvatarPress}/>
    );
  };

  renderBottom = (type) => {
    const {context} = this;
    const {account, group} = this.props;
    const {theme} = this.props.account.user;

    if (type === 'channel') {
      return (
        <View style={this.styles.btnContainer}>
          <Button
            color={colors[theme].blueCornFlower}
            style={this.styles.btn}
            textStyle={{fontSize: 15}}
            onPress={() => this.onUnsubscribe(group.current.link)}
            disabled={!group.current.isSubscribed}>{context.t('Unsubscribe')}</Button>
          <Button
            color={colors[theme].blackText}
            style={[this.styles.btn, this.styles.btnBorder]}
            textStyle={{fontSize: 15}}
            onPress={this.onSoundMute}
            disabled>{context.t('SoundMute')}</Button>
        </View>
      );
    }

    return (
      <MessageInput
        theme={theme}
        context={context}
        quote={this.state.quote}
        onPressQuote={this.onQuotePress}
        disabled={!account.net.connected || !account.connected || !group.current.isSubscribed}
        onSubmit={this.onSubmitText}/>
    );
  };

  renderMessageList = (theme) => {
    const {context} = this;
    const {groupMessage, group} = this.props;
    const currentGroup = group.current;

    return (
      <Fragment>
        <MessageList
          items={groupMessage.list}
          renderItem={this.renderMessage}
          theme={theme}
          showTyping={this.state.showTyping}
          typing={groupMessage.typing}
          context={context}/>
        {this.renderBottom(currentGroup.type)}
      </Fragment>
    );
  };

  render() {
    const {context} = this;
    const {account, group} = this.props;
    const currentGroup = group.current;
    const {theme} = account.user;
    // const membersCount = (currentGroup.members && Object.keys(currentGroup.members)) || 0;
    const navbarDescription = ''; // `${context.t('Users')}: ${membersCount > 0 ? membersCount : 0}`;

    return (
      <MainLayout netOffline={!account.net.connected} wsConnected={account.connected}>
        <BackgroundLayout theme={theme}>
          {group.loading && <Loader/>}
          <View style={this.styles.navbarContainer}>
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
              <KeyboardAvoidingView style={this.styles.container} behavior="padding" enabled>
                {this.renderMessageList(theme)}
              </KeyboardAvoidingView> :
              <KeyboardAvoidingView style={this.styles.container} enabled>
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
