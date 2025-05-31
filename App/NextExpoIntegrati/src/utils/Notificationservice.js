import messaging from '@react-native-firebase/messaging';
import { Alert, Platform, PermissionsAndroid } from 'react-native';

export async function requestUserPermission() {
  try {
    // Request permission for Android 13+ (API level 33+)
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission denied');
        return false;
      }
    }

    // Request Firebase messaging permission
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      await getFCMToken();
      return true;
    } else {
      console.log('Notification permission denied');
      return false;
    }
  } catch (error) {
    console.log('Permission request error:', error);
    return false;
  }
}

export async function getFCMToken() {
  try {
    // Get FCM token
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    
    // Store token locally or send to your backend
    // You can use AsyncStorage to save it locally
    return token;
  } catch (error) {
    console.log('Error getting FCM token:', error);
    return null;
  }
}

export function setupNotificationListeners() {
  // Listen for notifications when app is in foreground
  const unsubscribeForeground = messaging().onMessage(async (remoteMessage) => {
    console.log('Foreground notification received:', remoteMessage);
    
    // Show alert for foreground notifications
    Alert.alert(
      remoteMessage.notification?.title || 'Notification',
      remoteMessage.notification?.body || 'You have a new message',
      [
        {
          text: 'OK',
          onPress: () => console.log('Notification acknowledged')
        }
      ]
    );
  });

  // Listen for notifications when app is opened from background
  const unsubscribeBackground = messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log('Background notification opened app:', remoteMessage);
    
    // Handle navigation or specific actions here
    if (remoteMessage.data?.screen) {
      // Navigate to specific screen based on notification data
      console.log('Navigate to:', remoteMessage.data.screen);
    }
  });

  // Check if app was opened from a notification when app was killed
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log('App opened from killed state by notification:', remoteMessage);
        // Handle the notification that opened the app
      }
    });

  // Listen for token refresh
  const unsubscribeTokenRefresh = messaging().onTokenRefresh(async (token) => {
    console.log('FCM Token refreshed:', token);
    // Send the refreshed token to your server
  });

  // Return unsubscribe functions for cleanup
  return {
    unsubscribeForeground,
    unsubscribeBackground,
    unsubscribeTokenRefresh
  };
}