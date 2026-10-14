import type { PropsWithChildren } from 'react';
import { Button, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/use-color-scheme';

export function useLabColors() {
  const dark = useColorScheme() === 'dark';
  return {
    dark,
    background: dark ? '#111111' : '#FFFFFF',
    card: dark ? '#111111' : '#FFFFFF',
    text: dark ? '#FFFFFF' : '#111111',
    muted: dark ? '#AAAAAA' : '#666666',
    border: dark ? '#555555' : '#CCCCCC',
    accent: dark ? '#8BB8FF' : '#2563EB',
    soft: dark ? '#222222' : '#F5F5F5',
    error: dark ? '#FDA4AF' : '#BE123C',
  };
}

export function LabScreen({ children }: PropsWithChildren) {
  const colors = useLabColors();
  return (
    <SafeAreaView style={[labStyles.screen, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView style={labStyles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag" contentContainerStyle={labStyles.content}>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export function LabButton({ label, onPress, disabled = false, accessibilityLabel }: {
  label: string;
  onPress: () => void;
  secondary?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
}) {
  return <View style={{ minHeight: 44, justifyContent: 'center' }}><Button title={label} onPress={onPress} disabled={disabled} accessibilityLabel={accessibilityLabel ?? label} /></View>;
}

export const labStyles = StyleSheet.create({
  screen: { flex: 1 },
  content: { width: '100%', maxWidth: 600, alignSelf: 'center', padding: 16, paddingBottom: 32, gap: 12 },
  title: { fontSize: 22, fontWeight: '600' },
  body: { fontSize: 16, lineHeight: 24 },
  hint: { fontSize: 14, lineHeight: 20 },
  label: { fontSize: 16, fontWeight: '600' },
  input: { minHeight: 48, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 10, fontSize: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
});
