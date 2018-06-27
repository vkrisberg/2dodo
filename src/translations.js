const translations = {
  'ru': {
    // Main menu
    'Contacts': 'Контакты',
    'Favorites': 'Избранное',
    'Messages': 'Сообщения',
    'Groups': 'Группы',
    'Settings': 'Настройки',
    // Events
    'SkipAllFeatures': 'Skip all features',
    // Login
    'LoginWelcome': 'Введите ваш логин и пароль',
    'Login': 'Login',
    'Password': 'Пароль',
    'Enter': 'Enter',
    'LoginEmptyError': 'Заполните поля логин и пароль',
    'LoginEnterError': 'Неверный логин или пароль',
    'LoginAuthError': 'Ошибка при авторизации',
    'ForBestSecurity': 'Для лучшей безопасности',
    'CreateNewKey': 'Создать новый ключ',
    'ForgotPassword': 'Восстановление пароля',
    'FirstTimeInApp': 'Первый раз в приложении?',
    'KeysImport': 'Импортировать ключи',
    'EnterKeyAction': 'Ввести ключ',
    'ReadQrCode': 'Прочитать QR-код',
    'RestoreFromBackup': 'Восстановить из резервной копии',
    'Cancel': 'Отмена',
    // Registration
    'Registration': 'Регистрация',
    'RegistrationLoginDescription': 'Во время регистрации приложение создаст ключ безопасности для восстановления',
    'RegistrationEmailDescription': 'Для восстановления доступа к вашей учетной записи требуется электронная почта',
    'RegistrationSettingsDescription': 'Вы можете настроить приложение или пропустить этот шаг до лучших времен',
    'UseSpecialServerParams': 'Использовать специальные параметры сервера',
    'CreateLogin': 'Создать логин',
    'RepeatPassword': 'Повторите пароль',
    'Email': 'Электронная почта',
    'Phone': 'Телефон',
    'Firstname': 'Имя',
    'Secondname': 'Фамилия',
    'UniqueId': 'Уникальный ID',
    'ChannelName': 'Имя канала',
    'Description': 'Описание',
    'Continue': 'Продолжить',
    'Done': 'Завершить',
    'Edit': 'Изменить',
    'EditUser': 'Изменение профиля',
    'GoToApp': 'В приложение',
    'SkipThisStep': 'Пропустить этот шаг',
    'RegistrationProgress': 'Регистрация в процессе',
    'RegistrationSuccess': 'Регистрация прошла успешно',
    'RegistrationFailed': 'Ошибка регистрации',
    // Settings
    'SetYourPhoto': 'Выберите ваш аватар',
    'DayLight': 'Дневная',
    'DarkNight': 'Ночная',
    'Name': 'Имя',
    'SecondName': 'Фамилия',
    'GetAccessToPushNotifications': 'Дайте доступ 2dodo для push-уведомлений для получения сообщений',
    'Recover': 'Восстановить',
    'RecoverPass': 'Восстановление пароля',
    'RecoverPassDescription': 'Введите адрес электронной почты, прикрепленный к вашей учетной записи',
    'SuccessForgotPass': 'Пароль успешно восстановлен',
    'SuccessForgotPassDescription': 'A letter with password recovery sent to ',
    'SuccessForgotPassSubDescription': 'Запрос можно повторить через ',
    'EnterKey': 'Введите ключ',
    'EnterKeyDescription': 'Введите ключ, чтобы продолжить восстановление данных своей учетной записи',
    'ChooseYourPhoto': 'Choose your photo',
    'ChooseFromGallery': 'Choose from gallery',
    'FullscreenPhoto': 'Fullscreen photo',
    'DeletePhoto': 'Delete photo',
    'HaveMessage': 'У вас новое сообщение...',
    'NoMessagesYet': 'У вас пока нет сообщений...',
    'HaveVoiceMessage': 'Отправил(а) вам аудиосообщение',
    'HaveVideo': 'Отправил(а) вам видео...',
    'HaveImage': 'Отправил(а) вам изображение...',
    'HaveCall': 'Пропущенный звонок',
    'Logout': 'Выход',
    'SoundsAndNotifications': 'Звук и настройки',
    'Appearance': 'Оформление',
    'Language': 'Язык',
    'Security': 'Безопасность',
    'ExtendedSettings': 'Расширенные настройки',
    'Help': 'Помощь',
    'Questions': 'Вопросы',
    'UseCode': 'Пин-код',
    // Buttons
    'Delete': 'Удалить',
    'DeleteContact': 'Удалить контакт',
    'DeleteContactConfirm': 'Вы уверенны, что хотите удалить контакт?',
    // Errors
    'Required': 'Required',
    'LoginRegexpError': 'Login must be minimum 2 characters long and only contain a-z, 0-9 and _',
    'PasswordRegexpError': 'Password must be minimum 6 characters long',
    'RepeatPasswordNotMatch': 'Passwords do not match',
    'ServerRegexpError': 'Invalid server address',
    'EmailRegexpError': 'Invalid email address',
    'PhoneRegexpError': 'Invalid phone number',
    'NameRegexpError': 'Only letters, numbers, dashes and dotes are allowed',
    'AddContact': 'Добавить контакт',
    'AddContactPlaceholder': 'Добавить контакт по @nickname',
    'AddContactQrCode': 'Нажмите здесь, чтобы использовать сканер QR-кода для добавления контакта друга',
    'NoContacts': 'У Вас еще нет контактов',
    'ContactProfile': 'Профиль',
    'Search': 'Поиск',
    'SearchResults': 'Результаты поиска',
    // Chat
    'NoChats': 'У Вас еще нет чатов',
    'NoMessages': 'Нет сообщений',
    'CreateChat': 'Создать чат',
    'Message': 'Сообщение',
    'ShowQrCode': 'Показать QR-код',
    'ShowMyQrCode': 'Показать мой QR-код',
    'UserName': 'Имя пользователя',
    'UserGroups': 'Группы',
    'UserPhones': 'Телефоны',
    'UserBio': 'Биография',
    'UserKeys': 'Ключи',
    'MediaFiles': 'Сохраненные медиа файлы',
    'SettingsContact': 'Настройки',
    'Share': 'Поделиться',
    'Notifications': 'Уведомления',
    'UserBlock': 'Заблокировать',
    'ClearHistory': 'Очистить историю',
    'Enabled': 'Вкл',
    'Disabled': 'Выкл',
    'Sound': 'Звук',
    'Call': 'Звонок',
    'SearchInGroups': 'Искать в группах и каналах',
    'SearchGroupsOnly': 'Искать в группах',
    'SearchGlobalGroups': 'Искать в глобальных группах',
    'NoGroupsInvited': 'No groups invited',
    'SearchGroups': 'You can search in group catalog',
    'GroupCreate': 'Создать группу',
    'Next': 'Далее',
    'NextStep': 'Далее',
    'CroupChat': 'Групповой чат',
    'CreateChannel': 'Create bot or channel',
    'FindGroup': 'Найти групповой чат',
    'InviteUsers': 'Пригласить пользователей в группу',
    'Create': 'Создать',
    'PrivateChannel': 'Private channel',
    // Contact
    'online': 'в сети',
    'offline': 'не в сети',
    'InContacts': 'в контактах',
    'ProfileRequest': 'Profile request',
    'ProfileRequestDescription': 'User <{username}> has added you to their contact list. Send your profile data?',
    'Accept': 'Accept',
  },
  'en': {
    // Main menu
    'Contacts': 'Contacts',
    'Favorites': 'Favorites',
    'Messages': 'Messages',
    'Groups': 'Groups',
    'Settings': 'Settings',
    // Events
    'SkipAllFeatures': 'Skip all features',
    // Login
    'LoginWelcome': 'Please enter your login and pass',
    'Login': 'Login',
    'Password': 'Password',
    'Enter': 'Enter',
    'LoginEmptyError': 'Fill login and password fields',
    'LoginEnterError': 'Wrong username or password',
    'LoginAuthError': 'Authorization failed',
    'ForBestSecurity': 'For best security',
    'CreateNewKey': 'Create a new key',
    'ForgotPassword': 'Forgot password',
    'FirstTimeInApp': 'First time in app?',
    'KeysImport': 'Keys import',
    'EnterKeyAction': 'Enter key',
    'ReadQrCode': 'Read QR-code',
    'RestoreFromBackup': 'Restore from backup',
    'Cancel': 'Cancel',
    // Registration
    'Registration': 'Registration',
    'RegistrationLoginDescription': 'During registration, the application will create security key for recovery',
    'RegistrationEmailDescription': 'Email is required to restore access to your account',
    'RegistrationSettingsDescription': 'You can set up the application or skip this step until better times',
    'UseSpecialServerParams': 'Use a special server parameters',
    'CreateLogin': 'Create login',
    'RepeatPassword': 'Repeat password',
    'Email': 'Email',
    'Phone': 'Phone',
    'Firstname': 'Fistname',
    'Secondname': 'Secondname',
    'UniqueId': 'Unique ID',
    'ChannelName': 'Name of channel',
    'Description': 'Description',
    'Continue': 'Continue',
    'Done': 'Done',
    'Edit': 'Edit',
    'EditUser': 'Edit user',
    'GoToApp': 'Go to app',
    'SkipThisStep': 'Skip this step',
    'RegistrationProgress': 'Registration in progress',
    'RegistrationSuccess': 'Registration success',
    'RegistrationFailed': 'Registration failed',
    // Settings
    'SetYourPhoto': 'Set your photo',
    'DayLight': 'Day light',
    'DarkNight': 'Dark night',
    'Name': 'Name',
    'SecondName': 'Second name',
    'GetAccessToPushNotifications': 'Get 2dodo access to push notifications to receive a messages',
    'Recover': 'Recover',
    'RecoverPass': 'Recover pass',
    'RecoverPassDescription': 'Enter the email address associated with your account',
    'SuccessForgotPass': 'Success',
    'SuccessForgotPassDescription': 'A letter with password recovery sent to ',
    'SuccessForgotPassSubDescription': 'Repeat the request in ',
    'EnterKey': 'Enter key',
    'EnterKeyDescription': 'Enter key to continue recovery your account details',
    'ChooseYourPhoto': 'Choose your photo',
    'ChooseFromGallery': 'Choose from gallery',
    'FullscreenPhoto': 'Fullscreen photo',
    'DeletePhoto': 'Delete photo',
    'HaveMessage': 'You have a new message...',
    'NoMessagesYet': 'You have no messages yet...',
    'HaveVoiceMessage': 'Send your a voice message',
    'HaveVideo': 'Send your a video...',
    'HaveImage': 'Send your an image...',
    'HaveCall': 'Missed call',
    'Logout': 'Logout',
    'SoundsAndNotifications': 'Sounds and notifications',
    'Appearance': 'Appearance',
    'Language': 'Language',
    'Security': 'Security and pin-code',
    'ExtendedSettings': 'Extended settings',
    'Help': 'Help',
    'Questions': 'Questions',
    'UseCode': 'Use code',
    // Buttons
    'Delete': 'Delete',
    'DeleteContact': 'Delete contact',
    'DeleteContactConfirm': 'Are you sure you want to delete the contact?',
    // Errors
    'Required': 'Required',
    'LoginRegexpError': 'Login must be minimum 2 characters long and only contain a-z, 0-9 and _',
    'PasswordRegexpError': 'Password must be minimum 6 characters long',
    'RepeatPasswordNotMatch': 'Passwords do not match',
    'ServerRegexpError': 'Invalid server address',
    'EmailRegexpError': 'Invalid email address',
    'PhoneRegexpError': 'Invalid phone number',
    'NameRegexpError': 'Only letters, numbers, dashes and dotes are allowed',
    'AddContact': 'Add contact',
    'AddContactPlaceholder': 'Search contacts for @nickname',
    'AddContactQrCode': 'Tap here to use QR-code scanner to add friend contact',
    'NoContacts': 'Your have no contacts yet',
    'ContactProfile': 'Profile',
    'Search': 'Search',
    'SearchResults': 'Search results',
    // Chat
    'NoChats': 'Your have not chats yet',
    'NoMessages': 'No messages',
    'CreateChat': 'Create chat',
    'Message': 'Message',
    'ShowQrCode': 'Show QR-code',
    'ShowMyQrCode': 'Show my QR-code',
    'UserName': 'Username',
    'UserGroups': 'Groups',
    'UserPhones': 'Phones',
    'UserBio': 'Bio',
    'UserKeys': 'User keys',
    'MediaFiles': 'Saved media files',
    'SettingsContact': 'Settings contact',
    'Share': 'Share',
    'Notifications': 'Notifications',
    'UserBlock': 'Block user',
    'ClearHistory': 'Clear history',
    'Enabled': 'Enabled',
    'Disabled': 'Disabled',
    'Sound': 'Sound',
    'Call': 'Call',
    'SearchInGroups': 'Search in groups and channels',
    'SearchGroupsOnly': 'Search in groups',
    'SearchGlobalGroups': 'Find in global groups',
    'NoGroupsInvited': 'No groups invited',
    'SearchGroups': 'You can search in group catalog',
    'GroupCreate': 'Create group',
    'Next': 'Next',
    'NextStep': 'Next step',
    'CroupChat': 'Group chat',
    'CreateChannel': 'Create bot or channel',
    'FindGroup': 'Find a group chat',
    'InviteUsers': 'Invite users in group',
    'Create': 'Create and invite',
    'PrivateChannel': 'Private channel',
    // Contact
    'online': 'online',
    'offline': 'offline',
    'InContacts': 'in contacts',
    'ProfileRequest': 'Profile request',
    'ProfileRequestDescription': 'User <{username}> has added you to their contact list. Send your profile data?',
    'Accept': 'Accept',
  },
};

export default translations;
