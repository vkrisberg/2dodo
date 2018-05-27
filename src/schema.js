import CONFIG from './config';

/**
 * User schema
 */
class User {
  get fullName() {
    return `${this.firstName} ${this.secondName}`;
  }
}

User.schema = {
  name: 'User',
  primaryKey: 'username',
  properties: {
    username: 'string', // login@hostname
    nickname: 'string', // login
    email: 'string',
    phones: 'string?[]',
    firstName: 'string?',
    secondName: 'string?',
    bio: 'string?',
    avatar: 'data?',
  },
};

/**
 * RSA key schema
 */
class RsaKey {
}

RsaKey.schema = {
  name: 'RsaKey',
  primaryKey: 'username',
  properties: {
    username: 'string',
    publicKey: 'string',
    privateKey: 'string',
    hashKey: 'string',
  },
};

/**
 * Account schema
 */
class Account {
}

Account.schema = {
  name: 'Account',
  primaryKey: 'username',
  properties: {
    username: 'string',
    user: 'User',
    keys: 'RsaKey',
    deviceId: 'string',
    hostname: 'string',
    dateCreate: 'date',
    dateUpdate: 'date',
  },
};

/**
 * Contact schema
 */
class Contact {
  get fullName() {
    return `${this.firstName} ${this.secondName}`;
  }

  get hostname() {
    return this.username.split('@')[1];
  }
}

Contact.schema = {
  name: 'Contact',
  primaryKey: 'username',
  properties: {
    username: 'string', // login@hostname
    nickname: 'string', // login
    deviceId: 'string?',
    phones: 'string?[]',
    firstName: {type: 'string', optional: true, indexed: true},
    secondName: {type: 'string', optional: true, indexed: true},
    bio: 'string?',
    avatar: 'data?',
    sound: 'string?',
    notification: {type: 'bool', default: true},
    isBlocked: {type: 'bool', default: false},
    settings: 'string?',
    publicKey: 'string?',
    dateCreate: 'date',
    dateUpdate: 'date',
  },
};

/**
 * Chat schema
 */
class Chat {
}

Chat.schema = {
  name: 'Chat',
  primaryKey: 'id',
  properties: {
    id: 'string', // unique chat id (uuid4)
    name: 'string',
    owner: 'string',
    members: 'string[]',
    shortName: 'string?',
    avatar: 'data?',
    lastMessage: 'ChatMessage?',
    unreadCount: {type: 'int', default: 0},
    sort: {type: 'int', default: 0},
    pin: {type: 'int', default: 0},
    isMuted: {type: 'bool', default: false},
    isDeleted: {type: 'bool', default: false},
    dateCreate: 'date',
    dateUpdate: 'date',
  },
};

/**
 * Chat message schema
 */
class ChatMessage {
}

ChatMessage.schema = {
  name: 'ChatMessage',
  properties: {
    chatId: {type: 'string', indexed: true},
    type: {type: 'string', indexed: true, default: 'text'}, // [text, audio, video, image, call]
    username: {type: 'string', indexed: true}, // login@hostname
    from: 'string?', // login@hostname@deviceId
    text: 'string?',
    fileUrl: 'string?',
    user: 'Contact?',
    quote: 'ChatMessage?',
    status: {type: 'string', default: 'sending'}, // [sending, sent, received, read, error]
    isOwn: {type: 'bool', default: false},
    isFavorite: {type: 'bool', indexed: true, default: false},
    salt: 'string',
    dateSend: 'date',
    dateCreate: 'date',
    dateUpdate: 'date',
  },
};

/**
 * Group/channel schema
 */
class Group {
}

Group.schema = {
  name: 'Group',
  primaryKey: 'id',
  properties: {
    id: 'string', // unique group id (uuid4)
    link: {type: 'string', indexed: true}, // unique group link
    type: {type: 'string', indexed: true}, // group_chat/channel
    name: {type: 'string', indexed: true},
    description: 'string',
    owner: 'string',
    members: 'string?[]',
    shortName: 'string?',
    avatar: 'data?',
    lastMessage: 'GroupMessage?',
    unreadCount: {type: 'int', default: 0},
    sort: {type: 'int', default: 0},
    pin: {type: 'int', default: 0},
    isMuted: {type: 'bool', default: false},
    isDeleted: {type: 'bool', default: false},
    dateCreate: 'date',
    dateUpdate: 'date',
  },
};

/**
 * Group/channel message schema
 */
class GroupMessage {
}

GroupMessage.schema = {
  name: 'GroupMessage',
  properties: {
    groupId: {type: 'string', indexed: true},
    groupLink: 'string',
    groupType: 'string',
    type: {type: 'string', indexed: true, default: 'text'}, // [text, audio, video, image, call]
    username: {type: 'string', indexed: true}, // login@hostname
    from: 'string', // login@hostname@deviceId
    text: 'string?',
    fileUrl: 'string?',
    user: 'Contact?',
    quote: 'GroupMessage?',
    status: {type: 'string', default: 'sending'}, // [sending, sent, received, read, error]
    isOwn: {type: 'bool', default: false},
    isFavorite: {type: 'bool', indexed: true, default: false},
    dateSend: 'date',
    dateCreate: 'date',
    dateUpdate: 'date',
  },
};

export default [
  User,
  RsaKey,
  Account,
  Contact,
  ChatMessage,
  Chat,
  GroupMessage,
  Group,
];
