import {createStackNavigator} from 'react-navigation';

import TabNavigator from './tab-navigator';
import {
  Login,
  Registration,
  ForgotPassword,
  Preload,
  Events,
} from './containers';
import {ContactAdd, ContactProfile} from './containers/contacts';
import {ChatCreate, ChatMessage} from './containers/messages';
import {GroupAdd} from './containers/groups';
import {SettingsProfile, SoundSettings, AppearanceSettings, AdvancedSettings, SafetySettings} from './containers/settings';
import {Connection, Cryptography} from './containers/settings/advanced';
import {RequestProfileModal} from './containers/modals';

export const MainStack = createStackNavigator({
  Login: {
    screen: Login,
  },
  Registration: {
    screen: Registration,
  },
  ForgotPassword: {
    screen: ForgotPassword,
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
  GroupAdd: {
    screen: GroupAdd,
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
