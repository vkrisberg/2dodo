/**
 * User schema
 */
class User {
  get fullName() {
    return `${this.firstName || ''} ${this.secondName || ''}`.trim();
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
    avatar: 'string?',
    theme: 'string',
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
    return `${this.firstName || ''} ${this.secondName || ''}`.trim();
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
    groups: 'string?[]',
    phones: 'string?[]',
    firstName: {type: 'string', optional: true, indexed: true},
    secondName: {type: 'string', optional: true, indexed: true},
    bio: 'string?',
    avatar: 'string?',
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
 * Hash key schema
 */
class HashKey {
}

HashKey.schema = {
  name: 'HashKey',
  properties: {
    chatId: {type: 'string', indexed: true},
    messageId: {type: 'string', optional: true, indexed: true},
    hashKey: 'string',
    dateSend: {type: 'date', indexed: true},
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
    owner: 'string', // login@hostname
    members: 'string[]', // [login@hostname, ...]
    membersHash: 'string?', // sha256 hash from members
    shortName: 'string?',
    avatar: 'string?',
    lastMessage: 'ChatMessage?',
    contacts: 'Contact[]',
    unreadCount: {type: 'int', default: 0},
    sort: {type: 'int', default: 0},
    pin: {type: 'int', default: 0},
    isMuted: {type: 'bool', default: false},
    isDeleted: {type: 'bool', indexed: true, default: false},
    salt: 'string?',
    dateSend: 'date?',
    dateCreate: {type: 'date', indexed: true},
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
  primaryKey: 'id',
  properties: {
    id: 'string', // unique message id (uuid4)
    chatId: {type: 'string', indexed: true},
    type: {type: 'string', indexed: true, default: 'text'}, // [text, audio, video, image, call]
    username: {type: 'string', indexed: true}, // login@hostname
    from: 'string?', // login@hostname@deviceId
    text: 'string?',
    filename: 'string?',
    fileUrl: 'string?',
    contact: 'Contact?',
    quote: 'string?', // ChatMessage json string
    status: {type: 'string', default: 'sending'}, // [sending, sent, received, read, error]
    isOwn: {type: 'bool', default: false},
    isFavorite: {type: 'bool', indexed: true, default: false},
    salt: 'string',
    dateSend: {type: 'date', indexed: true},
    dateCreate: {type: 'date', indexed: true},
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
    role: 'string', // member/admin (my role)
    hostname: 'string?',
    owner: 'string', // login@hostname
    members: 'string?[]',
    shortName: 'string?',
    avatar: 'string?',
    lastMessage: 'GroupMessage?',
    unreadCount: {type: 'int', default: 0},
    sort: {type: 'int', default: 0},
    pin: {type: 'int', default: 0},
    isMuted: {type: 'bool', default: false},
    isDeleted: {type: 'bool', indexed: true, default: false},
    isSubscribed: {type: 'bool', default: true},
    isBanned: {type: 'bool', default: false},
    banReason: 'string?',
    dateBan: 'date?',
    dateCreate: {type: 'date', indexed: true},
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
  primaryKey: 'id',
  properties: {
    id: 'string', // unique message id (uuid4)
    groupId: {type: 'string', indexed: true},
    groupLink: 'string',
    groupType: 'string',
    type: {type: 'string', indexed: true, default: 'text'}, // [text, audio, video, image, call]
    username: {type: 'string', indexed: true}, // login@hostname
    from: 'string?', // login@hostname@deviceId
    text: 'string?',
    filename: 'string?',
    fileUrl: 'string?',
    contact: 'Contact?',
    quote: 'string?', // GroupMessage json string
    status: {type: 'string', default: 'sending'}, // [sending, sent, received, read, error]
    isOwn: {type: 'bool', default: false},
    isFavorite: {type: 'bool', indexed: true, default: false},
    dateSend: {type: 'date', indexed: true},
    dateCreate: {type: 'date', indexed: true},
    dateUpdate: 'date',
  },
};

export default [
  User,
  RsaKey,
  Account,
  Contact,
  HashKey,
  ChatMessage,
  Chat,
  GroupMessage,
  Group,
];
