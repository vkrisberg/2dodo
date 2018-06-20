export default {
  // chat actions
  createChat: 'create_chat',
  chatMessage: 'chat_message', // send
  chatMessageReceived: 'chat_message_received',
  chatMessageRead: 'chat_message_read',
  chatMessageTyping: 'chat_message_typing',
  // group actions
  createGroup: 'create_group',
  getGroup: 'get_group',
  getPublicGroupList: 'get_public_group_list',
  updateGroup: 'update_group',
  deleteGroup: 'delete_group',
  inviteMembersToGroup: 'invite_members',
  subscribeToGroup: 'subscribe_to_group',
  unsubscribeFromGroup: 'unsubscribe_from_group',
  getGroupMember: 'get_group_member',
  updateGroupMember: 'update_group_member',
  sendGroupMessage: 'send_group_message',
  // server actions
  getOpenKey: 'get_open_key',
  deliveryReport: 'delivery_report',
  search: 'search',
  requestSync: 'request_sync',
  syncMessages: 'sync_messages',
};
