export default [
  {
    id: 'chat1', // unique chat id (uuid4)
    name: 'Gomer Simpson',
    owner: '',
    members: [],
    shortName: '',
    avatar: '',
    lastMessage: {
      id: '1',
      chatId: 'chat1',
      type: 'text', // [text, audio, video, image, call]
      username: 'Kolya',
      from: 'Gomer Simpson',
      text: 'Hello!',
      fileUrl: '',
      user: {
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
          avatar: 'https://st.kp.yandex.net/images/actor_iphone/iphone360_110.jpg',
          theme: 'string',
        },
      },
      quote: {},
      status: 'sending', // [sending, send, received, read, error]
      isOwn: false,
      isFavorite: false,
      salt: '',
      dateSend: null,
      dateCreate: null,
      dateUpdate: null,},
    unreadCount: 1,
    sort: 0,
    pin: 0,
    isMuted: false,
    isDeleted: false,
    dateCreate: null,
    dateUpdate: '2018-06-15 10:00',
  },
  {
    id: 'chat2', // unique chat id (uuid4)
    name: 'Lisa Simpson',
    owner: '',
    members: [],
    shortName: '',
    avatar: 'http://i.imgur.com/4LClmI1.png',
    lastMessage: {
      id: '1',
      chatId: 'chat2',
      type: 'text', // [text, audio, video, image, call]
      username: 'Kolya',
      from: 'Lisa Simpson',
      text: 'Lisa how many times do you talk your music is dangerous to the ears!',
      fileUrl: '',
      user: {
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
          avatar: 'https://st.kp.yandex.net/images/actor_iphone/iphone360_110.jpg',
          theme: 'string',
        },
      },
      quote: {},
      status: 'sending', // [sending, send, received, read, error]
      isOwn: false,
      isFavorite: false,
      salt: '',
      dateSend: null,
      dateCreate: null,
      dateUpdate: null,},
    unreadCount: 0,
    sort: 0,
    pin: 0,
    isMuted: false,
    isDeleted: false,
    dateCreate: null,
    dateUpdate: '2018-06-14 10:00',
  },
];
