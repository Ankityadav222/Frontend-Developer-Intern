import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { requestUserPermission, getFCMToken, setupNotificationListeners } from '../services/FCMService';

export default function HomeScreen() {
  const [showWebView, setShowWebView] = useState(false);
  const [fcmToken, setFcmToken] = useState<string | null>(null);

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

  const registerTokenWithServer = async (token: string) => {
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

  if (showWebView) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Next.js Integration</Text>
        </View>
        <WebView
          source={{ uri: 'https://nextexpoapp-c07d6.web.app/' }}
          style={styles.webview}
          onLoad={() => console.log('WebView loaded')}
          onError={(error) => {
            console.log('WebView error:', error);
            Alert.alert('WebView Error', 'Failed to load the page');
          }}
          javaScriptEnabled
          domStorageEnabled
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.title}>Next.js Integration Test</Text>
        <Text style={styles.subtitle}>Testing connection to:</Text>
        <Text style={styles.url}>https://nextexpoapp-c07d6.web.app/</Text>

        <TouchableOpacity style={styles.button} onPress={testConnection}>
          <Text style={styles.buttonText}>Test Connection</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => {
            setShowWebView(true);
            if (fcmToken) {
              registerTokenWithServer(fcmToken);
            }
          }}
        >
          <Text style={styles.buttonText}>Load WebView Anyway</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 10,
    backgroundColor: '#007AFF',
  },
  headerText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  webview: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  url: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    minWidth: 200,
  },
  buttonSecondary: {
    backgroundColor: '#FF6B6B',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
