import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { globalStyles } from '../../../styles/globalStyles'; // Adjust path based on your folder structure
import { COLORS } from '../../../styles/theme';

export default function SettingsScreen() {
  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      "Are you sure you want to leave the Knight's Portal?",
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              // Sign out from Google first if applicable
              await GoogleSignin.signOut().catch(() => {});
              // Sign out from Firebase
              await auth().signOut();
            } catch (error) {
              console.error('Logout Error:', error);
            }
          },
        },
      ],
    );
  };

  return (
    <View style={globalStyles.container}>
      {/* Header section to match the branding */}
      <View style={styles.headerSpacer}>
        <Text style={globalStyles.headerTitle}>Account Settings</Text>
        <View style={styles.underline} />
      </View>

      <View style={globalStyles.card}>
        <Text style={styles.sectionTitle}>Security & Access</Text>
        <Text style={styles.description}>
          Manage your session and account security here.
        </Text>

        {/* Using the secondaryButton from globalStyles for the "Red" themed logout */}
        <TouchableOpacity
          style={globalStyles.secondaryButton}
          onPress={handleSignOut}
        >
          <Text style={globalStyles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>Letran PRT v1.0 • Arriba!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerSpacer: {
    marginTop: 40,
    marginBottom: 30,
    alignItems: 'center',
  },
  underline: {
    height: 3,
    width: 60,
    backgroundColor: COLORS.accent, // Gold underline for prestige
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 20,
  },
  footerText: {
    textAlign: 'center',
    color: COLORS.textLight,
    fontSize: 12,
    marginTop: 'auto',
    marginBottom: 20,
  },
});
