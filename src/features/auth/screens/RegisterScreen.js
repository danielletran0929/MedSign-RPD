import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { globalStyles } from '../../../styles/globalStyles';
import { COLORS } from '../../../styles/theme';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signUp = async () => {
    // Basic validation
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password should be at least 6 characters.');
      return;
    }

    try {
      await auth().createUserWithEmailAndPassword(email, password);
      // Firebase will automatically trigger the onAuthStateChanged listener in App.js
    } catch (e) {
      Alert.alert('Registration Error', e.message);
    }
  };

  return (
    <View style={globalStyles.container}>
      {/* Header Section */}
      <View style={{ marginTop: 60, alignItems: 'center' }}>
        <Text style={globalStyles.headerTitle}>New Knight</Text>
        <Text style={globalStyles.arribaText}>Join the Colegio</Text>
      </View>

      {/* Registration Card */}
      <View style={globalStyles.card}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: COLORS.text,
            marginBottom: 15,
          }}
        >
          Create Your Account
        </Text>

        <TextInput
          style={globalStyles.input}
          placeholder="Institutional Email (@letran.edu.ph)"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={globalStyles.input}
          placeholder="Password (6+ chars)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={globalStyles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={globalStyles.primaryButton} onPress={signUp}>
          <Text style={globalStyles.buttonText}>Register Now</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={globalStyles.linkText}>Already a Knight? Sign In</Text>
      </TouchableOpacity>

      <Text
        style={{
          textAlign: 'center',
          color: COLORS.textLight,
          fontSize: 11,
          marginTop: 20,
        }}
      >
        By registering, you agree to the Letran Manila Data Privacy Policy.
      </Text>
    </View>
  );
}
