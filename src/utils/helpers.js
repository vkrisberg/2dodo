const getFullName = (contact) => {
  if (contact.firstName || contact.secondName) {
    return `${contact.firstName || ''} ${contact.secondName || ''}`.trim();
  }

  return `@${contact.nickname}`;
};

const getUsername = (from) => {
  if (!from) {
    return '';
  }
  const fromArr = from.split('@');
  return `${fromArr[0]}@${fromArr[1]}`;
};

const getNickname = (username) => {
  if (!username) {
    return '';
  }
  const usernameArr = username.split('@');
  return usernameArr[0] ? `@${usernameArr[0]}` : '';
};

const getLogin = (login) => {
  if (!login) {
    return '';
  }
  const loginArr = login.split('@');
  return loginArr[0] ? `${loginArr[0]}` : '';
};

const getDeviceId = (from) => {
  const fromArr = from.split('@');
  return fromArr[2] || '';
};

const getRealmPath = (username) => {
  if (!username) {
    return 'default.realm';
  }
  const dbName = username.replace('@', '_');
  return `${dbName}.realm`;
};

export default {
  getFullName,
  getUsername,
  getNickname,
  getLogin,
  getDeviceId,
  getRealmPath,
};
