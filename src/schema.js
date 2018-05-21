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
    firstName: 'string?',
    secondName: 'string?',
    avatar: 'string?',
  }
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
  }
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
  }
};

/**
 * Chat message schema
 */
class Message {
}

Message.schema = {
  name: 'Message',
  primaryKey: 'username',
  properties: {
    username: 'string',
    from: 'string',
    text: 'string',
    dateCreate: 'date',
    dateUpdate: 'date',
  }
};

export default [
  User,
  RsaKey,
  Account,
  Message,
];
