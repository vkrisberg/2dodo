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
    'Password': 'Password',
    'Enter': 'Enter',
    'LoginEmptyError': 'Заполните поля логин и пароль',
    'LoginEnterError': 'Неверный логин или пароль',
    'LoginAuthError': 'Ошибка при авторизации на сервере',
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
    'Continue': 'Продолжить',
    'Done': 'Завершить',
    'Edit': 'Изменить',
    'EditUser': 'Изменение профиля',
    'GoToApp': 'В приложение',
    'SkipThisStep': 'Пропустить этот шаг',
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
    // Buttons
    'Delete': 'Удалить',
    'DeleteContact': 'Удалить контакт',
    // Errors
    'Required': 'Required',
    'LoginRegexpError': 'Login must be minimum 2 characters long and only contain a-z, 0-9 and _',
    'PasswordRegexpError': 'Password must be minimum 6 characters long',
    'RepeatPasswordNotMatch': 'Passwords do not match',
    'ServerRegexpError': 'Invalid server address',
    'EmailRegexpError': 'Invalid email address',
    'PhoneRegexpError': 'Invalid phone number',
    'NameRegexpError': 'Only letters, numbers and dashes are allowed',
    'AddContact': 'Добавить контакт',
    'AddContactPlaceholder': 'Добавить контакт по @nickname',
    'AddContactQrCode': 'Нажмите здесь, чтобы использовать сканер QR-кода для добавления контакта друга',
    'NoContacts': 'У Вас еще нет контактов',
    'ContactProfile': 'Профиль',
    'SearchResults': 'Результаты поиска',
    // Chat
    'NoChats': 'У Вас еще нет чатов',
    'NoMessages': 'Нет сообщений',
    'CreateChat': 'Создать чат',
    'Message': 'Сообщение',
    'ShowQrCode': 'Показать QR-код',
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
    'SearchInGroups': 'Искать в группах',
    'NoGroupsInvited': 'No groups invited',
    'SearchGroups': 'You can search in group catalog',
    'GroupCreate': 'Создать группу',
    'Next': 'Далее',
    'NextStep': 'Далее',
    'CroupChat': 'Групповой чат',
    'CreateChannel': 'Create bot or channel',
    'FindGroup': 'Найти групповой чат',
    'InviteUsers': 'Пригласить пользователей в группу',
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
    'LoginAuthError': 'Authorization server error',
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
    'Continue': 'Continue',
    'Done': 'Done',
    'Edit': 'Edit',
    'EditUser': 'Edit user',
    'GoToApp': 'Go to app',
    'SkipThisStep': 'Skip this step',
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
    // Buttons
    'Delete': 'Delete',
    'DeleteContact': 'Delete contact',
    // Errors
    'Required': 'Required',
    'LoginRegexpError': 'Login must be minimum 2 characters long and only contain a-z, 0-9 and _',
    'PasswordRegexpError': 'Password must be minimum 6 characters long',
    'RepeatPasswordNotMatch': 'Passwords do not match',
    'ServerRegexpError': 'Invalid server address',
    'EmailRegexpError': 'Invalid email address',
    'PhoneRegexpError': 'Invalid phone number',
    'NameRegexpError': 'Only letters, numbers and dashes are allowed',
    'AddContact': 'Add contact',
    'AddContactPlaceholder': 'Search contacts for @nickname',
    'AddContactQrCode': 'Tap here to use QR-code scanner to add friend contact',
    'NoContacts': 'Your have not contacts yet',
    'ContactProfile': 'Profile',
    'SearchResults': 'Search results',
    // Chat
    'NoChats': 'Your have not chats yet',
    'NoMessages': 'No messages',
    'CreateChat': 'Create chat',
    'Message': 'Message',
    'ShowQrCode': 'Show QR-code',
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
    'SearchInGroups': 'Search in groups and channels',
    'NoGroupsInvited': 'No groups invited',
    'SearchGroups': 'You can search in group catalog',
    'GroupCreate': 'Create group',
    'Next': 'Next',
    'NextStep': 'Next step',
    'CroupChat': 'Group chat',
    'CreateChannel': 'Create bot or channel',
    'FindGroup': 'Find a group chat',
    'InviteUsers': 'Invite users in group',
  },
};

export default translations;
