import * as DocumentPicker from 'expo-document-picker';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Text, View } from 'react-native';

import type { SelectedFile } from '@/constants/form-examples';
import { LabButton, labStyles, useLabColors } from './lab-ui';

export default function MediaField({ kind, files, onChange, onBusyChange }: {
  kind: 'file' | 'image' | 'camera';
  files: SelectedFile[];
  onChange: (files: SelectedFile[]) => void;
  onBusyChange: (busy: boolean) => void;
}) {
  const colors = useLabColors();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pick() {
    setError(null);
    setBusy(true);
    onBusyChange(true);
    try {
      if (kind === 'file') {
        const result = await DocumentPicker.getDocumentAsync({ multiple: true, copyToCacheDirectory: true, base64: false });
        if (!result.canceled) onChange(result.assets.map((file) => ({ uri: file.uri, name: file.name, mimeType: file.mimeType ?? null, size: file.size ?? null })));
        return;
      }
      if (kind === 'camera') {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
          setError('Camera access was not granted. Allow camera access in your device settings to try this example.');
          return;
        }
      }
      const options: ImagePicker.ImagePickerOptions = { mediaTypes: ['images'], quality: 0.8 };
      const result = kind === 'camera'
        ? await ImagePicker.launchCameraAsync(options)
        : await ImagePicker.launchImageLibraryAsync(options);
      if (!result.canceled) onChange(result.assets.map((file) => ({
        uri: file.uri, name: file.fileName ?? 'photo', mimeType: file.mimeType ?? null,
        size: file.fileSize ?? null, width: file.width, height: file.height,
      })));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Could not open the picker. Please try again.');
    } finally {
      setBusy(false);
      onBusyChange(false);
    }
  }

  return (
    <View style={{ gap: 16 }}>
      <LabButton secondary disabled={busy} label={busy ? 'Opening…' : kind === 'file' ? 'Choose files' : kind === 'camera' ? 'Open camera' : 'Choose a photo'} onPress={pick} />
      {error && <Text accessibilityRole="alert" style={[labStyles.hint, { color: colors.error }]}>{error}</Text>}
      {files.length === 0 && <Text style={[labStyles.hint, { color: colors.muted }]}>No {kind === 'file' ? 'files' : 'photo'} selected yet.</Text>}
      {files.map((file, index) => (
        <View key={`${file.uri}-${index}`} style={{ gap: 10 }}>
          {kind !== 'file' && <Image source={{ uri: file.uri }} contentFit="contain" accessibilityLabel="Selected photo preview" style={{ width: '100%', height: 220, borderRadius: 12, backgroundColor: colors.soft }} />}
          <Text style={[labStyles.label, { color: colors.text }]}>{file.name}</Text>
          <Text style={[labStyles.hint, { color: colors.muted }]}>{file.mimeType ?? 'Unknown file type'} · {file.size === null ? 'Size unavailable' : `${Math.ceil(file.size / 1024)} KB`}</Text>
          <LabButton secondary label={`Remove ${file.name}`} disabled={busy} onPress={() => onChange(files.filter((_file, position) => position !== index))} />
        </View>
      ))}
    </View>
  );
}
