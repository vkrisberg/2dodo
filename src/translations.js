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
    'NewPassword': 'Новый пароль',
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
    'SuccessResetPassword': 'Пароль успешно восстановлен',
    'SuccessResetPasswordDescription': 'A letter with password recovery sent to ',
    'SuccessResetPasswordSubDescription': 'Запрос можно повторить через ',
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
    'SoundSettings': 'Настройки звука',
    'GlobalNotifications': 'Глобальные уведомления',
    'PreviewMessages': 'Предварительный просмотр сообщений',
    'SoundMessage': 'Звук сообщений',
    'GroupNotifications': 'Групповые уведомления',
    'ShowGroupMessages': 'Показывать групповые сообшения',
    'GroupSoundMessages': 'Звук групповых сообщений',
    'SoundInApplication': 'Sound in application',
    'Vibration': 'Вибрация',
    'GlobalMessagePreview': 'Global message preview',
    'ResetSettings': 'Сбросить все настройки',
    'ColorScheme': 'Цветовая тема',
    'FontSize': 'Размер шрифта',
    'SendOnEnter': 'Отпралять при нажатии Enter',
    'NotShowPrint': 'Не показывать при печати',
    'HideReadNotification': 'Скрыть уведомление о прочтении',
    'SaveContent': 'Сохранять контент на телефон',
    'AdvancedSettings': 'Расширенные настройки',
    'ConnectionStatus': 'Соединение',
    'Cryptography': 'Шифрование',
    'BackupCopy': 'Резервная копия',
    'ProxyConnection': 'Прокси-соединение',
    'GoogleKeyNotifications': 'Google push-уведомления',
    'SendAnalytics': 'Отправлять аналитику',
    'BackgroundSynchronization': 'Фоновая синхронизация',
    'ClearCash': 'Очистить кэш',
    'AboutApp': 'О приложении',
    'Version': 'Версия',
    'Safety': 'Безопасность',
    'SetPin': 'Установить PIN-код',
    'SynchronizeContact': 'Синхронизировать контакты',
    'Geolocation': 'Геолокация',
    'ShareGallery': 'Показывать галерею',
    'SynchronizationAndGeolocation': 'Синхронизация и доступ к геолокации недоступны, если вы отключили их в Настройки > Конфиденциальность',
    'Connection': 'Соединение',
    'ConnectionInformation': 'Информация о подключении',
    'AuthorizationDevices': 'Авторизованные устройства',
    'IpAddress': 'IP адрес',
    'ConnectFrom': 'Подключено в',
    'ConfiguringDevices': 'Настроить',
    'IdDevice': 'ID устройства',
    'KeyDevice': 'Ключ устройства',
    'ExportKeys': 'Экспортировать ключи',
    'ImportKeys': 'Импортировать ключи',
    'KeysInfo': 'Информация о ключах',
    'SecurityKeys': 'Для обеспечения безопасности Ваших данных, рекомендуем менять ключи не реже одного раза в 3 месяца',
    'Manual': 'Руководство',
    'ScheduledBackup': 'Запланированное резервное копирование',
    'ArchivePassword': 'Создать пароль для архива',
    'LocationBackup': 'Расположение резервной копии',
    'BackupCopyInfo': 'Копии файлов, хранящихся в репозитории, позволяют восстанавливать все данные на новом устройстве',
    'ProxySettings': 'Настройки прокси',
    'ProxyChannelSecure': 'Использовать прокси канал для безопасности',
    'ProxyForCalls': 'Использовать прокси для звонков',
    'ProxyInfo': 'Использование прокси для звонков защитит ваши данные, но может ухудшить связь',
    'Server': 'Сервер',
    'Proxy': 'Прокси',
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
    'TextRegexpError': 'Only letters, numbers and punctuations are allowed',
    'ProxyRegexpError': 'Введите корректный прокси-адрес',
    'TokenRegexpError': 'Введите корректный ключ',
    'AddContact': 'Добавить контакт',
    'AddContactPlaceholder': 'Добавить контакт по @nickname',
    'AddContactQrCode': 'Нажмите здесь, чтобы использовать сканер QR-кода для добавления контакта друга',
    'NoContacts': 'У Вас еще нет контактов',
    'ContactProfile': 'Профиль',
    'Search': 'Поиск',
    'SearchResults': 'Результаты поиска',
    'NoEmailExist': 'Пользователя с таким email не существует',
    'OperationNotPerformed': 'Операция не выполнена, попробуйте еще раз',
    'NoTokenOrUser': 'Токен или пользователь не найден',
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
    'typing': 'typing',
    // Contact
    'online': 'в сети',
    'offline': 'не в сети',
    'InContacts': 'в контактах',
    'ProfileRequest': 'Profile request',
    'ProfileRequestDescription': 'User <{username}> has added you to their contact list. Send your profile data?',
    'Accept': 'Accept',
    //About
    'AppVersion': 'Версия приложения',
    'AboutAppFirstParagraph': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'AboutAppSecondParagraph': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'OpenSourceGitHub': 'На основе opensource GitHub',
    //Favorites
    'NoMessagesInFavorites': 'Нет сообщений в избранных',
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
    'NewPassword': 'New password',
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
    'SuccessResetPassword': 'Success',
    'SuccessResetPasswordDescription': 'A letter with password recovery sent to ',
    'SuccessResetPasswordSubDescription': 'Repeat the request in ',
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
    'SoundSettings': 'Sound settings',
    'GlobalNotifications': 'Global notifications',
    'PreviewMessages': 'Preview messages in spotlight',
    'SoundMessage': 'Sound message',
    'GroupNotifications': 'Group notifications',
    'ShowGroupMessages': 'Show group messages in spotlight',
    'GroupSoundMessages': 'Group sound messages',
    'SoundInApplication': 'Sound in application',
    'Vibration': 'Vibration',
    'GlobalMessagePreview': 'Global message preview',
    'ResetSettings': 'Reset all settings',
    'ColorScheme': 'Color scheme',
    'FontSize': 'Font size',
    'SendOnEnter': 'Send on Enter',
    'NotShowPrint': 'Do not show when print',
    'HideReadNotification': 'Hide read notification',
    'SaveContent': 'Save content on phone',
    'AdvancedSettings': 'Advanced settings',
    'ConnectionStatus': 'Connection status',
    'Cryptography': 'Cryptography',
    'BackupCopy': 'Backup copy',
    'ProxyConnection': 'Proxy-connection',
    'GoogleKeyNotifications': 'Google key push-notifications',
    'SendAnalytics': 'Send analytics',
    'BackgroundSynchronization': 'Background synchronization',
    'ClearCash': 'Clear cash',
    'AboutApp': 'About app',
    'Version': 'Version',
    'Safety': 'Safety',
    'SetPin': 'Set PIN-code',
    'SynchronizeContact': 'Synchronize contact',
    'Geolocation': 'Geolocation',
    'ShareGallery': 'Share gallery',
    'SynchronizationAndGeolocation': 'Synchronization and access to geolocation unavailable if you have disabled settings in the phone in Settings > Privacy',
    'Connection': 'Connection',
    'ConnectionInformation': 'Connection information',
    'AuthorizationDevices': 'Authorization devices',
    'IpAddress': 'IP address',
    'ConnectFrom': 'Connect from',
    'ConfiguringDevices': 'Configuring authorized devices',
    'IdDevice': 'ID device',
    'KeyDevice': 'Key device',
    'ExportKeys': 'Export keys',
    'ImportKeys': 'Import keys',
    'KeysInfo': 'Information about keys',
    'SecurityKeys': 'Security section recommends keep keys at least once every 3 months to ensure the security of your data',
    'Manual': 'Manual',
    'ScheduledBackup': 'Scheduled backup',
    'ArchivePassword': 'Create password for archive',
    'LocationBackup': 'Location backup',
    'BackupCopyInfo': 'Copies of files stored in the repository and allow you to restore all data on the new device',
    'ProxySettings': 'Proxy settings',
    'ProxyChannelSecure': 'Use proxy channel for secure',
    'ProxyForCalls': 'Use proxy for calls',
    'ProxyInfo': 'Use of a proxy for calls will secure your data, but may worsen communication',
    'Server': 'Server',
    'Proxy': 'Proxy',
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
    'TextRegexpError': 'Only letters, numbers and punctuations are allowed',
    'ProxyRegexpError': 'Enter correct proxy-address',
    'TokenRegexpError': 'Enter correct key',
    'AddContact': 'Add contact',
    'AddContactPlaceholder': 'Search contacts for @nickname',
    'AddContactQrCode': 'Tap here to use QR-code scanner to add friend contact',
    'NoContacts': 'Your have no contacts yet',
    'ContactProfile': 'Profile',
    'Search': 'Search',
    'SearchResults': 'Search results',
    'NoEmailExist': 'A user with this email doesn\'t exist',
    'OperationNotPerformed': 'Operation not performed, please try again',
    'NoTokenOrUser': 'Token or user not found',
    // Chat
    'NoChats': 'Your have no chats yet',
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
    'typing': 'typing',
    // Contact
    'online': 'online',
    'offline': 'offline',
    'InContacts': 'in contacts',
    'ProfileRequest': 'Profile request',
    'ProfileRequestDescription': 'User <{username}> has added you to their contact list. Send your profile data?',
    'Accept': 'Accept',
    //About
    'AppVersion': 'Application version',
    'AboutAppFirstParagraph': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'AboutAppSecondParagraph': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'OpenSourceGitHub': 'Based on the opensource GitHub',
    //Favorites
    'NoMessagesInFavorites': 'No messages in favorites',
  },
};

export default translations;
