import {createStackNavigator} from 'react-navigation';

import TabNavigator from './tab-navigator';
import {
  Login,
  Registration,
  ResetPassword,
  Preload,
  Events,
  About,
} from './containers';
import {ContactAdd, ContactProfile} from './containers/contacts';
import {ChatCreate, ChatMessage} from './containers/messages';
import {ResetPasswordEnterKey, ResetPasswordPassSuccess} from './containers/reset-password';
import {GroupAdd, GroupCreate} from './containers/groups';
import {SettingsProfile, SoundSettings, AppearanceSettings, AdvancedSettings, SafetySettings} from './containers/settings';
import {Connection, Cryptography, BackupCopy, Proxy} from './containers/settings/advanced';
import {RequestProfileModal} from './containers/modals';

export const MainStack = createStackNavigator({
  Login: {
    screen: Login,
  },
  Registration: {
    screen: Registration,
  },
  ResetPassword: {
    screen: ResetPassword,
  },
  ResetPasswordEnterKey: {
    screen: ResetPasswordEnterKey,
  },
  ResetPasswordPassSuccess: {
    screen: ResetPasswordPassSuccess,
  },
  Messages: {
    screen: TabNavigator,
  },
  Events: {
    screen: Events,
  },
  Preload: {
    screen: Preload,
  },
  ContactAdd: {
    screen: ContactAdd,
  },
  ContactProfile: {
    screen: ContactProfile,
  },
  ChatCreate: {
    screen: ChatCreate,
  },
  ChatMessage: {
    screen: ChatMessage,
  },
  SettingsProfile: {
    screen: SettingsProfile,
  },
  SoundSettings: {
    screen: SoundSettings,
  },
  AppearanceSettings: {
    screen: AppearanceSettings,
  },
  AdvancedSettings: {
    screen: AdvancedSettings,
  },
  SafetySettings: {
    screen: SafetySettings,
  },
  Connection: {
    screen: Connection,
  },
  Cryptography: {
    screen: Cryptography,
  },
  BackupCopy: {
    screen: BackupCopy,
  },
  Proxy: {
    screen: Proxy,
  },
  About: {
    screen: About,
  },
  GroupAdd: {
    screen: GroupAdd,
  },
  GroupCreate: {
    screen: GroupCreate,
  },

}, {
  headerMode: 'none',
  initialRouteName: 'Preload',
  gesturesEnabled: false,
  navigationOptions: {
    header: null,
    headerBackTitle: null
  },
});

export const RootStack = createStackNavigator({
  Main: {
    screen: MainStack,
  },
  RequestProfileModal: {
    screen: RequestProfileModal,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
  initialRouteName: 'Main',
  gesturesEnabled: false,
  navigationOptions: {
    header: null,
    headerBackTitle: null
  },
  cardStyle: {
    backgroundColor: 'transparent',
    opacity: 1,
  },
  transitionConfig: () => ({
    transitionSpec: {duration: 0},
    screenInterpolator: () => {},
  }),
});
