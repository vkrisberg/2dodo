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

const getDeviceId = (from) => {
  const fromArr = from.split('@');
  return fromArr[2] || '';
};

export default {
  getFullName,
  getUsername,
  getNickname,
  getDeviceId,
};
