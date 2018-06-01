import {createBottomTabNavigator} from 'react-navigation';
import React from 'react';

import {
  Contacts,
  Groups,
  Favorits,
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
      tabBarIcon: ({ focused }) => <ContactsIcon active={focused} />
    }
  },
  Favorits: {
    screen: Favorits,
    navigationOptions: {
      tabBarIcon: ({ focused }) => <FavoritsIcon active={focused} />
    }
  },
  Messages: {
    screen: Messages,
    navigationOptions: {
      tabBarLabel: 'Messages',
      tabBarIcon: ({ focused }) => <MessagesIcon active={focused} />
    }
  },
  Groups: {
    screen: Groups,
    navigationOptions: {
      tabBarIcon: ({ focused }) => <GroupsIcon active={focused} />
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarIcon: ({ focused }) => <SettingsIcon active={focused} />
    }
  }
}, {
  initialRouteName: 'Messages',
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showIcon: true,
    activeTintColor: '#68a7ff',
    inactiveTintColor:'#a4a7ae',
    upperCaseLabel: false,
    style: {
      backgroundColor: '#ffffff',
      borderTopWidth: 1,
      borderTopColor: '#f2f5fa',
      height: 60
    },
    labelStyle: {
      fontSize: 11,
      position: 'absolute',
      width: 107,
      bottom: 0
    },
    indicatorStyle: {
      backgroundColor: 'white'
    },
    tabStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 25
    },
    iconStyle :{
      height: 27
    }
  }
});
