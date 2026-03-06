import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Import your global styles and theme
import { globalStyles } from '../../../styles/globalStyles';
import { COLORS } from '../../../styles/theme';

GoogleSignin.configure({
  webClientId:
    '591167185308-1sb2lkdat2n1sspbpum752s82dan9uar.apps.googleusercontent.com',
});

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInWithEmail = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      const idToken = response.idToken || response.data?.idToken;

      if (!idToken) {
        throw new Error('No ID Token found. Google Sign-In failed.');
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (e) {
      console.log('Full Error Object:', JSON.stringify(e));
      Alert.alert('Google Sign-In Error', e.message);
    }
  };

  return (
    <View style={globalStyles.container}>
      {/* Header Section */}
      <View style={{ marginTop: 60, alignItems: 'center' }}>
        <Text style={globalStyles.headerTitle}>Knight's Portal</Text>
        <Text style={globalStyles.arribaText}>Sempre Arriba!</Text>
      </View>

      {/* Login Card */}
      <View style={globalStyles.card}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: COLORS.text,
            marginBottom: 15,
          }}
        >
          Authentication
        </Text>

        <TextInput
          style={globalStyles.input}
          placeholder="Institutional Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={globalStyles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={globalStyles.primaryButton}
          onPress={signInWithEmail}
        >
          <Text style={globalStyles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}
        >
          <View
            style={{ flex: 1, height: 1, backgroundColor: COLORS.border }}
          />
          <Text style={{ marginHorizontal: 10, color: COLORS.textLight }}>
            OR
          </Text>
          <View
            style={{ flex: 1, height: 1, backgroundColor: COLORS.border }}
          />
        </View>

        <TouchableOpacity
          style={globalStyles.secondaryButton}
          onPress={signInWithGoogle}
        >
          <Text style={globalStyles.buttonText}>Sign In with Google</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={globalStyles.linkText}>New Knight? Create an Account</Text>
      </TouchableOpacity>
    </View>
  );
}
