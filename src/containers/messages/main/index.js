import React, {Component} from 'react';
import {PushNotificationIOS, AppState, Alert, Platform} from 'react-native';
import RNDeviceInfo from 'react-native-device-info';
import FCM from 'react-native-fcm';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {isEmpty, map, get} from 'lodash';
import moment from 'moment';

import {MainLayout, BackgroundLayout, DismissKeyboardLayout} from '../../../components/layouts';
import {ChatList} from '../../../components/lists';
import {SearchInput, Navbar, NavbarDots, ButtonAdd, ChatListItem, ButtonNavbar} from '../../../components/elements';
import {accountActions, chatActions, chatMessageActions, contactActions, groupActions} from '../../../store/actions';
import {actionEnum, routeEnum} from '../../../enums';
// import androidPushListeners from './android-push-listeners';

const GET_ONLINE_UPDATE_TIME = 10000; // in ms
const NAVIGATE_TIMEOUT = 200; // in ms

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
    this.timer = null;
  }

  async componentDidMount() {
    await this.init();
  }

  componentWillUnmount() {
    this.unmount();
  }

  init = async () => {
    AppState.addEventListener('change', this.handleAppStateChange);
    // Push notifications for Android
    if (Platform.OS === 'android') {
      // androidPushListeners.registerKilledListener();
      // androidPushListeners.registerAppListener(this.props.navigation);
      const notify = await FCM.getInitialNotification().then((notify) => {
        console.log('INITIAL NOTIFY', notify);
        return notify;
      });
      if (notify) {
        const action = get(notify, 'action', '');
        const meta = JSON.parse(get(notify, 'meta', '{}'));
        await this.notificationActions({action, meta});
      }
      try {
        let result = await FCM.requestPermissions({badge: true, sound: true, alert: true});
        console.log('FCM.requestPermissions result', result);
      } catch (e) {
        console.error(e);
      }
      FCM.getFCMToken().then(token => {
        console.log('FCM.getFCMToken', token);
      });
    }

    // Push notifications for iOS
    if (Platform.OS === 'ios') {
      PushNotificationIOS.addEventListener('register', this.onPushRegistered);
      PushNotificationIOS.addEventListener('registrationError', this.onPushRegistrationError);
      PushNotificationIOS.addEventListener('notification', this.onRemoteNotification);
      PushNotificationIOS.addEventListener('localNotification', this.onLocalNotification);
      PushNotificationIOS.requestPermissions();
    }

    this.loadChatList();
    this.loadContactList();
    this.timer = setInterval(() => {
      this.props.dispatch(contactActions.getOnlineUsers());
    }, GET_ONLINE_UPDATE_TIME);

    setTimeout(() => {
      this.props.dispatch(accountActions.setRouteName(routeEnum.Messages));
      // show request profile modal if exist
      if (this.props.contact.receiveRequestProfile) {
        this.props.navigation.navigate(routeEnum.RequestProfileModal);
      }
    }, 1000);

    // TODO - remove after tests
    // this.sendTestLocalNotification();
  };

  unmount = () => {
    clearInterval(this.timer);
    if (Platform.OS === 'ios') {
      PushNotificationIOS.removeEventListener('register', this.onPushRegistered);
      PushNotificationIOS.removeEventListener('registrationError', this.onPushRegistrationError);
      PushNotificationIOS.removeEventListener('notification', this.onRemoteNotification);
      PushNotificationIOS.removeEventListener('localNotification', this.onLocalNotification);
    }
    AppState.removeEventListener('change', this.handleAppStateChange);
  };

  handleAppStateChange = (state) => {
    console.log('APP STATE:', state);

    if (Platform.OS === 'ios') {
      PushNotificationIOS.setApplicationIconBadgeNumber(0);
    }

    this.props.dispatch(accountActions.setAppState(state));
  };

  notificationActions = async ({action, meta}) => {
    switch (action) {
      case actionEnum.chatMessage:
        try {
          const chat = await this.props.dispatch(chatActions.loadOne(meta.chatId));
          setTimeout(() => {
            this.props.navigation.navigate(routeEnum.ChatMessage, {chat});
          }, NAVIGATE_TIMEOUT);
        } catch (e) {
          console.log(e);
        }
        break;
      case actionEnum.sendGroupMessage:
        try {
          const group = await this.props.dispatch(groupActions.loadOneByLink(meta.link));
          setTimeout(() => {
            this.props.navigation.navigate(routeEnum.GroupMessage, {group});
          }, NAVIGATE_TIMEOUT);
        } catch (e) {
          console.log(e);
        }
        break;
      case actionEnum.requestProfile:
        console.log('REQUEST PROFILE NOTIFICATION', action, meta);
        break;
      default:
        break;
    }
  };

  onPushRegistered = (token) => {
    console.log('TOKEN:', token);

    if (!token) {
      return;
    }

    let device = {
      uuid: RNDeviceInfo.getUniqueID(),
      type: Platform.OS,
      name: RNDeviceInfo.getDeviceName(),
      model: RNDeviceInfo.getModel(),
      token,
    };

    console.log('DEVICE:', device);
  };

  onPushRegistrationError = (error) => {
    console.log('NOTIFICATION ERROR:', error);

    if (!error) {
      return;
    }

    Alert.alert(
      'Failed To Register For Remote Push',
      `Error (${error.code}): ${error.message}`,
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  };

  onRemoteNotification = async (notification) => {
    console.log('NOTIFICATION:', notification);

    if (!notification) {
      return;
    }

    const action = get(notification, '_data.action', '');
    const meta = get(notification, '_data.meta', {});

    await this.notificationActions({action, meta});

    // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  };

  onLocalNotification = (notification) => {
    console.log('LOCAL NOTIFICATION:', notification);
  };

  sendTestLocalNotification = () => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.scheduleLocalNotification({
        fireDate: moment().add(5, 'seconds').format('YYYY-MM-DDTHH:mm:ss.sssZ'),
        alertTitle: 'Chat Message',
        alertBody: 'You have a new message from @vova',
        applicationIconBadgeNumber: 1,
      });
    }
  };

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
      <MainLayout netOffline={!account.net.connected} wsConnected={account.connected}>
        <BackgroundLayout theme={theme} paddingHorizontal={10}>
          <Navbar renderTitle={this.context.t('Messages')}
                  renderLeft={<NavbarDots/>}
                  renderRight={this.renderNavbarButton()}/>
          <DismissKeyboardLayout style={{flex: 1, width: '100%'}}>
            <SearchInput placeholder="Search in chats" onChange={this.searchChats}/>
            <ChatList theme={theme}
                      context={this.context}
                      items={chat.list}
                      renderItem={this.renderChatItem}/>
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
}))(Messages);
