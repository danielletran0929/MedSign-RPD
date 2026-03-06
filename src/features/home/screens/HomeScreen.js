import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useAuth } from '../../auth/services/AuthContext';
import { globalStyles } from '../../../styles/globalStyles'; // Adjust path if needed
import { COLORS } from '../../../styles/theme';

export default function HomeScreen() {
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      await auth().signOut();
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <View style={globalStyles.container}>
      {/* Header Section */}
      <View style={{ marginTop: 40, alignItems: 'center' }}>
        <Text style={globalStyles.headerTitle}>Knight's Portal</Text>
        <Text style={globalStyles.arribaText}>Sempre Arriba!</Text>
      </View>

      {/* Profile Card */}
      <View
        style={[globalStyles.card, { alignItems: 'center', marginTop: 20 }]}
      >
        {/* User Avatar */}
        <View style={localStyles.avatarContainer}>
          {user?.photoURL ? (
            <Image source={{ uri: user.photoURL }} style={localStyles.avatar} />
          ) : (
            <Text style={localStyles.avatarPlaceholder}>
              {user?.displayName?.charAt(0) ||
                user?.email?.charAt(0).toUpperCase()}
            </Text>
          )}
        </View>

        <Text style={[globalStyles.title, { marginTop: 15 }]}>
          {user?.displayName || 'Knight'}
        </Text>
        <Text style={globalStyles.subtitle}>{user?.email}</Text>

        <View style={localStyles.badge}>
          <Text style={localStyles.badgeText}>Verified Student</Text>
        </View>
      </View>

      {/* Actions Section */}
      <View style={{ marginTop: 'auto', marginBottom: 20 }}>
        <TouchableOpacity
          style={globalStyles.secondaryButton}
          onPress={handleSignOut}
        >
          <Text style={globalStyles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Local styles for unique Home elements
const localStyles = {
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.accent, // Gold border for prestige
  },
  avatar: {
    width: 74,
    height: 74,
    borderRadius: 37,
  },
  avatarPlaceholder: {
    fontSize: 32,
    color: COLORS.white,
    fontWeight: '900',
  },
  badge: {
    backgroundColor: '#E8F0FE',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  badgeText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
};
