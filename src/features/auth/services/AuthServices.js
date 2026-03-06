import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth'; // Firebase Auth
import { GoogleSignin } from '@react-native-google-signin/google-signin'; // Google Sign-in

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Configure Google Sign-In globally
  useEffect(() => {
    GoogleSignin.configure({
      // Get this from your Firebase Console > Project Settings > Web Client ID
      webClientId:
        '591167185308-1sb2lkdat2n1sspbpum752s82dan9uar.apps.googleusercontent.com',
      offlineAccess: true,
    });
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const storedUser = await AsyncStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  };

  const googleLogin = async () => {
    try {
      // 1. Trigger the Google Sign-In flow
      const { idToken } = await GoogleSignin.signIn();

      // 2. Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // 3. Sign-in the user to Firebase with the credential
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );

      const userData = {
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
      };

      // 4. Save to local state and storage
      setUser(userData);
      await AsyncStorage.setItem('user', JSON.stringify(userData));

      return userCredential;
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await GoogleSignin.signOut(); // Sign out from Google
      await auth().signOut(); // Sign out from Firebase
      setUser(null);
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error(error);
    }
  };

  // ... keep your existing login/register functions ...

  return (
    <AuthContext.Provider value={{ user, logout, googleLogin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
