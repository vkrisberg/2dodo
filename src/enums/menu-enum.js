import React from 'react';

import {
  ContactsIcon,
  GroupsIcon,
  SettingsIcon,
  FavoritsIcon,
  MessagesIcon
} from '../components/icons';
import {routeEnum} from './index';

export default [
  {
    icon: <ContactsIcon />,
    activeIcon: <ContactsIcon active />,
    text: routeEnum.Contacts
  },
  {
    icon: <FavoritsIcon />,
    activeIcon: <FavoritsIcon active />,
    text: routeEnum.Favorits
  },
  {
    icon: <MessagesIcon />,
    activeIcon: <MessagesIcon active />,
    text: routeEnum.Messages
  },
  {
    icon: <GroupsIcon />,
    activeIcon: <GroupsIcon active />,
    text: routeEnum.Groups
  },
  {
    icon: <SettingsIcon />,
    activeIcon: <SettingsIcon active />,
    text: routeEnum.Settings
  }
];
