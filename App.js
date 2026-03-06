import React from 'react';
import { AuthProvider } from './src/features/auth/services/AuthContext';
import AppNavigator from './src/features/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
