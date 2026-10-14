import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import { Checkbox } from 'expo-checkbox';
import { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, TextInput, type TextInputProps, View } from 'react-native';

import type { FormExample, FormValue, SelectedFile } from '@/constants/form-examples';
import DateTimeField from './date-time-field';
import { LabButton, labStyles, useLabColors } from './lab-ui';
import MediaField from './media-field';

const TEXT_PROPS: Partial<Record<FormExample['id'], TextInputProps>> = {
  text: { autoCapitalize: 'words', autoComplete: 'name' },
  email: { inputMode: 'email', autoComplete: 'email', autoCapitalize: 'none', autoCorrect: false },
  password: { autoCapitalize: 'none', autoCorrect: false, autoComplete: 'off' },
  phone: { inputMode: 'tel', autoComplete: 'tel' },
  number: { inputMode: 'numeric' },
  decimal: { inputMode: 'decimal' },
  url: { inputMode: 'url', autoCapitalize: 'none', autoCorrect: false },
  multiline: { multiline: true, numberOfLines: 5, maxLength: 500, textAlignVertical: 'top' },
  search: { inputMode: 'search', returnKeyType: 'search', autoCapitalize: 'none' },
  otp: { inputMode: 'numeric', autoComplete: 'one-time-code', maxLength: 6 },
};

export default function FormField({ example, value, onChange, onSubmit, onBusyChange }: {
  example: FormExample;
  value: FormValue;
  onChange: (value: FormValue) => void;
  onSubmit: () => void;
  onBusyChange: (busy: boolean) => void;
}) {
  const colors = useLabColors();
  const [showPassword, setShowPassword] = useState(false);
  const kind = example.id;
  const inputStyle = [labStyles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.card }];

  switch (kind) {
    case 'checkbox':
      return (
        <View style={labStyles.row}>
          <Checkbox accessibilityLabel={example.label} value={Boolean(value)} onValueChange={onChange} color={Boolean(value) ? colors.accent : colors.muted} style={{ width: 28, height: 28, margin: 8 }} />
          <Pressable accessibilityRole="button" accessibilityLabel={`Toggle ${example.label}`} onPress={() => onChange(!value)} style={{ flex: 1, minHeight: 48, justifyContent: 'center' }}>
            <Text style={[labStyles.body, { color: colors.text }]}>{value ? 'Yes, please' : 'No, thanks'}</Text>
          </Pressable>
        </View>
      );
    case 'switch':
      return (
        <View style={[labStyles.row, { justifyContent: 'space-between', minHeight: 48 }]}>
          <Text style={[labStyles.body, { color: colors.text }]}>{value ? 'On' : 'Off'}</Text>
          <Switch accessibilityLabel={example.label} value={Boolean(value)} onValueChange={onChange} trackColor={{ false: colors.border, true: colors.accent }} />
        </View>
      );
    case 'radio':
      return <ChoiceOptions options={['Beginner', 'Intermediate', 'Advanced']} value={value} onChange={onChange} />;
    case 'multi-select':
      return <ChoiceOptions multiple options={['React Native', 'Expo', 'Navigation', 'Forms', 'Animations']} value={value} onChange={onChange} />;
    case 'segmented':
      return <ChoiceOptions compact options={['iOS', 'Android', 'Both']} value={value} onChange={onChange} />;
    case 'select':
      return (
        <View style={{ borderWidth: 1, borderColor: colors.border, overflow: 'hidden' }}>
          <Picker accessibilityLabel={example.label} selectedValue={String(value)} onValueChange={(selected) => onChange(String(selected))}
            dropdownIconColor={colors.text} itemStyle={{ color: colors.text }} style={{ color: colors.text, backgroundColor: colors.card, minHeight: 54 }}>
            {['Rwanda', 'Kenya', 'Uganda', 'Tanzania', 'Burundi', 'Other'].map((country) => <Picker.Item key={country} label={country} value={country} />)}
          </Picker>
        </View>
      );
    case 'slider':
      return (
        <View style={{ gap: 12 }}>
          <Text style={[labStyles.title, { color: colors.text }]}>{String(value)}%</Text>
          <Slider accessibilityLabel={example.label} accessibilityValue={{ min: 0, max: 100, now: Number(value) }} minimumValue={0} maximumValue={100} step={1}
            value={Number(value)} onValueChange={onChange} minimumTrackTintColor={colors.accent} maximumTrackTintColor={colors.border} thumbTintColor={colors.accent} style={{ width: '100%', height: 48 }} />
          <View style={[labStyles.row, { justifyContent: 'space-between' }]}>
            <Text style={[labStyles.hint, { color: colors.muted }]}>0</Text><Text style={[labStyles.hint, { color: colors.muted }]}>100</Text>
          </View>
        </View>
      );
    case 'stepper':
      return (
        <View style={[labStyles.row, { justifyContent: 'space-between' }]}>
          <LabButton secondary label="−" accessibilityLabel="Decrease quantity" disabled={Number(value) <= 0} onPress={() => onChange(Number(value) - 1)} />
          <Text accessibilityLiveRegion="polite" style={[labStyles.title, { color: colors.text }]}>{String(value)}</Text>
          <LabButton secondary label="+" accessibilityLabel="Increase quantity" disabled={Number(value) >= 20} onPress={() => onChange(Number(value) + 1)} />
        </View>
      );
    case 'rating':
      return (
        <View style={{ gap: 16 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }} accessibilityRole="radiogroup">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Pressable key={rating} accessibilityRole="radio" accessibilityLabel={`${rating} ${rating === 1 ? 'star' : 'stars'}`} accessibilityState={{ checked: value === rating }}
                onPress={() => onChange(rating)} style={styles.star}>
                <Text style={{ fontSize: 36, color: Number(value) >= rating ? colors.accent : colors.muted }}>{Number(value) >= rating ? '★' : '☆'}</Text>
              </Pressable>
            ))}
          </View>
          <Text style={[labStyles.hint, { color: colors.muted }]}>{value === 0 ? 'No rating yet' : `${value} out of 5`}</Text>
          <LabButton secondary label="Clear rating" onPress={() => onChange(0)} />
        </View>
      );
    case 'date':
    case 'time':
      return <DateTimeField mode={kind} value={String(value)} onChange={onChange} />;
    case 'color':
      return (
        <View style={{ gap: 16 }}>
          <View style={labStyles.wrap}>
            {['#2563EB', '#16A34A', '#E11D48', '#9333EA', '#EA580C', '#17243B'].map((color) => (
              <Pressable key={color} accessibilityRole="radio" accessibilityLabel={`Color ${color}`} accessibilityState={{ checked: value === color }} onPress={() => onChange(color)}
                style={[styles.swatch, { backgroundColor: color, borderColor: value === color ? colors.text : colors.border, borderWidth: value === color ? 3 : 1 }]}>
                {value === color && <Text style={{ fontSize: 20, color: '#FFFFFF' }}>✓</Text>}
              </Pressable>
            ))}
          </View>
          <TextInput accessibilityLabel="Custom hex color" value={String(value)} onChangeText={onChange} placeholder="#2563EB" placeholderTextColor={colors.muted}
            maxLength={7} autoCapitalize="characters" autoCorrect={false} style={inputStyle} />
          {/^#[\da-f]{6}$/i.test(String(value)) && <View accessibilityLabel={`Selected color ${value}`} style={{ height: 56, borderRadius: 12, backgroundColor: String(value) }} />}
        </View>
      );
    case 'file':
    case 'image':
    case 'camera':
      return <MediaField kind={kind} files={value as SelectedFile[]} onChange={onChange} onBusyChange={onBusyChange} />;
    default:
      return (
        <View style={{ gap: 12 }}>
          <TextInput
            {...TEXT_PROPS[kind]}
            accessibilityLabel={example.label}
            value={String(value)}
            onChangeText={(text) => onChange(kind === 'otp' ? text.replace(/\D/g, '') : text)}
            placeholder={example.placeholder}
            placeholderTextColor={colors.muted}
            selectionColor={colors.accent}
            secureTextEntry={kind === 'password' && !showPassword}
            onSubmitEditing={kind === 'multiline' ? undefined : onSubmit}
            returnKeyType={kind === 'search' ? 'search' : kind === 'multiline' ? 'default' : 'done'}
            style={[...inputStyle, kind === 'multiline' && { minHeight: 150 }, kind === 'otp' && { letterSpacing: 8, fontSize: 24 }]}
          />
          {kind === 'password' && <LabButton secondary label={showPassword ? 'Hide password' : 'Show password'} onPress={() => setShowPassword(!showPassword)} />}
          {kind === 'search' && <LabButton secondary label="Clear search" onPress={() => onChange('')} />}
          {kind === 'multiline' && <Text style={[labStyles.hint, { color: colors.muted }]}>{String(value).length} / 500 characters</Text>}
        </View>
      );
  }
}

function ChoiceOptions({ options, value, onChange, multiple = false, compact = false }: {
  options: string[];
  value: FormValue;
  onChange: (value: FormValue) => void;
  multiple?: boolean;
  compact?: boolean;
}) {
  const colors = useLabColors();
  const selectedValues = Array.isArray(value) ? value as string[] : [];
  return (
    <View style={multiple || compact ? labStyles.wrap : { gap: 10 }} accessibilityRole={multiple ? undefined : 'radiogroup'}>
      {options.map((option) => {
        const selected = multiple ? selectedValues.includes(option) : value === option;
        return (
          <Pressable key={option} accessibilityRole={multiple ? 'checkbox' : 'radio'} accessibilityState={{ checked: selected }}
            onPress={() => onChange(multiple ? selected ? selectedValues.filter((item) => item !== option) : [...selectedValues, option] : option)}
            style={({ pressed }) => [styles.choice, { borderColor: selected ? colors.accent : colors.border, backgroundColor: selected ? colors.soft : colors.card, opacity: pressed ? 0.7 : 1 }]}>
            <Text style={[labStyles.label, { color: selected ? colors.accent : colors.text }]}>{multiple ? selected ? '✓  ' : '+  ' : compact ? '' : selected ? '◉  ' : '○  '}{option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  choice: { minHeight: 44, paddingHorizontal: 10, paddingVertical: 10, borderWidth: 1, justifyContent: 'center' },
  star: { minWidth: 44, minHeight: 52, alignItems: 'center', justifyContent: 'center' },
  swatch: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
});
