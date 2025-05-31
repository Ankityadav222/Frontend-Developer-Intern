import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { requestUserPermission, getFCMToken, setupNotificationListeners } from '../services/FCMService';

export default function HomeScreen() {
  const [showWebView, setShowWebView] = useState(false);
  const [fcmToken, setFcmToken] = useState(null);

  useEffect(() => {
    const initializeFCM = async () => {
      try {
        const hasPermission = await requestUserPermission();
        if (hasPermission) {
          const token = await getFCMToken();
          setFcmToken(token);
          setupNotificationListeners();
        }
      } catch (error) {
        console.error('FCM initialization error:', error);
      }
    };

    initializeFCM();
  }, []);

  const testConnection = async () => {
    try {
      const response = await fetch('https://nextexpoapp-c07d6.web.app/');
      if (response.ok) {
        Alert.alert('Success!', 'Next.js app is accessible', [
          { 
            text: 'Load WebView', 
            onPress: () => {
              setShowWebView(true);
              if (fcmToken) {
                registerTokenWithServer(fcmToken);
              }
            }
          }
        ]);
      } else {
        Alert.alert('Error', 'Next.js app returned an error');
      }
    } catch (error) {
      Alert.alert('Connection Failed', 'Cannot reach Next.js app at https://nextexpoapp-c07d6.web.app/');
    }
  };

  const registerTokenWithServer = async (token) => {
    try {
      await fetch('https://nextexpoapp-c07d6.web.app/api/fcm/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      console.log('FCM token registered with server');
    } catch (error) {
      console.error('Failed to register FCM token:', error);
    }
  };

  // ... rest of your existing HomeScreen code
}