import messaging from '@react-native-firebase/messaging';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  return (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  );
};

export const getFCMToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    return token;
  } catch (error) {
    console.error('Failed to get FCM token', error);
    return null;
  }
};

export const setupNotificationListeners = () => {
  // Foreground notifications
  messaging().onMessage(async remoteMessage => {
    console.log('Foreground notification:', remoteMessage);
    // Display notification using your UI
  });

  // Notification opened from background state
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Notification opened from background:', remoteMessage);
  });

  // Notification opened from quit state
  messaging().getInitialNotification().then(remoteMessage => {
    if (remoteMessage) {
      console.log('Notification opened from quit state:', remoteMessage);
    }
  });
};