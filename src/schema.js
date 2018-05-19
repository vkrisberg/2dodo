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
    nickname: 'string', // login
    username: 'string', // login@hostname
    firstName: 'string?',
    secondName: 'string?',
    email: 'string',
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
    hostname: 'string',
    user: {type: 'User'},
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
  }
};

export default [
  User,
  RsaKey,
  Message,
];
