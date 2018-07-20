import {Platform, AsyncStorage, AppState} from 'react-native';
import FCM, {FCMEvent} from 'react-native-fcm';

AsyncStorage.getItem('lastNotification').then((data) => {
  if (data) {
    // if notification arrives when app is killed, it should still be logged here
    console.log('last notification', JSON.parse(data));
    AsyncStorage.removeItem('lastNotification');
  }
});

AsyncStorage.getItem('lastMessage').then(data => {
  if (data) {
    // if notification arrives when app is killed, it should still be logged here
    console.log('last message', JSON.parse(data));
    AsyncStorage.removeItem('lastMessage');
  }
});

const registerKilledListener = () => {
  // these callback will be triggered even when app is killed
  FCM.on(FCMEvent.Notification, (notify) => {
    console.log('Notification', notify);

    AsyncStorage.setItem('lastNotification', JSON.stringify(notify));
    if (notify.opened_from_tray) {
      setTimeout(() => {
        if (notify._actionIdentifier === 'reply') {
          if (AppState.currentState !== 'background') {
            console.log('User replied ' + JSON.stringify(notify._userText));
            alert('User replied ' + JSON.stringify(notify._userText));
          } else {
            AsyncStorage.setItem('lastMessage', JSON.stringify(notify._userText));
          }
        }
        if (notify._actionIdentifier === 'view') {
          alert('User clicked View in App');
        }
        if (notify._actionIdentifier === 'dismiss') {
          alert('User clicked Dismiss');
        }
      }, 1000)
    }
  });
};

// these callback will be triggered only when app is foreground or background
const registerAppListener = (navigation) => {
  FCM.on(FCMEvent.Notification, (notify) => {
    console.log('Notification', notify);

    if (notify.opened_from_tray) {
      if (notify.targetScreen === 'detail') {
        setTimeout(() => {
          navigation.navigate('Contacts')
        }, 500)
      }
      setTimeout(() => {
        alert(`User tapped notification\n${JSON.stringify(notify)}`)
      }, 500)
    }
  });

  FCM.on(FCMEvent.RefreshToken, token => {
    console.log('TOKEN (refreshUnsubscribe)', token);
  });

  FCM.on(FCMEvent.DirectChannelConnectionChanged, (data) => {
    console.log('direct channel connected', data);
  });

  FCM.enableDirectChannel();

  setTimeout(() => {
    FCM.isDirectChannelEstablished().then((data) => console.log('FCM.isDirectChannelEstablished', data));
  }, 1000);
};

export default {
  registerKilledListener,
  registerAppListener,
};
