import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import {colors, getFont} from './styles';

import {
  Contacts,
  Groups,
  Favorites,
  Settings,
  Messages
} from './containers';
import {
  ContactsIcon,
  GroupsIcon,
  FavoritsIcon,
  SettingsIcon,
  MessagesIcon
} from './components/icons';

export default createBottomTabNavigator({
  Contacts: {
    screen: Contacts,
    navigationOptions: {
      tabBarIcon: ({focused}) => <ContactsIcon active={focused}/>,
      tabBarLabel: 'Contacts',
    }
  },
  // Favorites: {
  //   screen: Favorites,
  //   navigationOptions: {
  //     tabBarIcon: ({focused}) => <FavoritsIcon active={focused}/>,
  //     tabBarLabel: 'Favorites',
  //   }
  // },
  Messages: {
    screen: Messages,
    navigationOptions: {
      tabBarIcon: ({focused}) => <MessagesIcon active={focused}/>,
      tabBarLabel: 'Messages',
    }
  },
  Groups: {
    screen: Groups,
    navigationOptions: {
      tabBarIcon: ({focused}) => <GroupsIcon active={focused}/>,
      tabBarLabel: 'Groups',
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarIcon: ({focused}) => <SettingsIcon active={focused}/>,
      tabBarLabel: 'Settings',
    }
  }
}, {
  initialRouteName: 'Messages',
  tabBarOptions: {
    showIcon: true,
    activeTintColor: colors.light.tabBarActiveTint,
    activeBackgroundColor: colors.light.tabBarActiveBg,
    inactiveTintColor: colors.light.tabBarInactiveTint,
    inactiveBackgroundColor: colors.light.tabBarInactiveBg,
    upperCaseLabel: false,
    style: {
      borderTopWidth: 1,
      borderTopColor: colors.light.tabBarTopBorder,
      height: 55,
    },
    labelStyle: {
      fontSize: 12,
      marginBottom: 5,
      ...getFont({}),
    },
    tabStyle: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconStyle: {
      height: 27
    }
  }
});
