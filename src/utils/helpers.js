const getFullName = (contact) => {
  if (contact.firstName || contact.secondName) {
    return `${contact.firstName || ''} ${contact.secondName || ''}`.trim();
  }

  return `@${contact.nickname}`;
};

export default {
  getFullName,
};
