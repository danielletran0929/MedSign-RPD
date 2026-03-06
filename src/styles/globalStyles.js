import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from './theme';

export const globalStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.l,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.m,
    marginBottom: SPACING.m,
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  // Typography
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.secondary, // Red for the main title
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  arribaText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary, // Blue for the "Arriba" slogan
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },

  // Components
  input: {
    height: 55,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: SPACING.m,
    fontSize: 16,
    color: COLORS.text,
    marginBottom: SPACING.m,
  },

  // Primary Action (Blue)
  primaryButton: {
    backgroundColor: COLORS.primary,
    height: 55,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.s,
  },

  // Secondary Action (Red)
  secondaryButton: {
    backgroundColor: COLORS.secondary,
    height: 55,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.s,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  linkText: {
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: SPACING.m,
  },
});
