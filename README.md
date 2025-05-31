# 🚀 Nexics Assignment - Next.js + Expo + Firebase Integration

This project is a full-stack implementation consisting of:
- A **Next.js** web app with **Material-UI (MUI)** and **Google Sign-In**
- An **Expo Android App** that embeds the Next.js project using **WebView**
- **Native Firebase Cloud Messaging (FCM)** integration for push notifications

🌐 **Live Deployment**: [https://nextexpoapp-c07d6.web.app](https://nextexpoapp-c07d6.web.app)

---

## 📁 Project Structure
Nexics-Assigment/
├── nextjs-firebase-auth/ # Next.js web app with MUI & Google Auth
├── App/NextExpoIntegrati/ # Expo app with WebView & FCM integration
└── README.md

---

## 🔧 Tech Stack

### ✅ Web (Next.js)
- [Next.js](https://nextjs.org/)
- [Material-UI](https://mui.com/)
- [Firebase Auth (Google Sign-In)](https://firebase.google.com/docs/auth/web/google-signin)
- Hosted on Firebase Hosting

### ✅ Mobile (Expo)
- [Expo (React Native)](https://expo.dev/)
- [WebView](https://docs.expo.dev/versions/latest/sdk/webview/)
- [Firebase Cloud Messaging (FCM)](https://firebase.google.com/docs/cloud-messaging)
  - Uses **native modules**, not Expo's built-in notifications

---

## 🧩 Features

### 🔐 Google Authentication
- Users can sign in using their Google accounts on the Next.js web app.

### 📱 Embedded Web App in Mobile
- The Next.js site is rendered inside the **Expo Android app** using a `WebView`.

### 🔔 Push Notifications with FCM
- The Expo app is integrated with **native FCM** (not Expo’s notification service).
- Receives and handles background and foreground push notifications.

---

## 📦 Setup Instructions

### 1️⃣ Next.js Web App (`nextjs-firebase-auth`)

#### ✅ Install Dependencies
```bash
cd nextjs-firebase-auth
npm install
Configure Firebase:

Add your Firebase project config in src/config/firebaseConfig.js

Enable Google authentication in your Firebase console

Run the app locally:
npm run dev
Deploy to Firebase Hosting (optional):

bash
Copy code
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
2. Expo Android App (App/NextExpoIntegrati)
Navigate to the folder:

bash
Copy code
cd App/NextExpoIntegrati
Install dependencies:

bash
Copy code
npm install
Setup Firebase FCM:

Download google-services.json from your Firebase console

Place it in the root of NextExpoIntegrati folder

Ensure native Firebase setup in AndroidManifest and build.gradle files as required by FCM

Run the Expo app on an Android device or emulator:

bash
Copy code
npx expo start --android
🔗 WebView Integration in Expo
The Expo app loads the Next.js web app via WebView:

tsx
Copy code
import { WebView } from 'react-native-webview';

<WebView
  source={{ uri: 'https://nextexpoapp-c07d6.web.app' }}
  style={{ flex: 1 }}
/>
🔔 Firebase Cloud Messaging (FCM) in Expo
Native FCM integration is used to handle push notifications.

This implementation avoids Expo's push notification service as per the assignment requirements.

Push notifications are configured to work both in foreground and background.

📅 Assignment Deadline
You have 4 days to complete this assignment.

🙋‍♂️ Author
Ankit Yadav
GitHub: https://github.com/Ankityadav222
