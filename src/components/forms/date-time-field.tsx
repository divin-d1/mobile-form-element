import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, Text, View } from 'react-native';

import { formatLocalDate, formatLocalTime } from '@/constants/form-examples';
import { LabButton, labStyles, useLabColors } from './lab-ui';

export type DateTimeFieldProps = {
  mode: 'date' | 'time';
  value: string;
  onChange: (value: string) => void;
};

export default function DateTimeField({ mode, value, onChange }: DateTimeFieldProps) {
  const colors = useLabColors();
  const [show, setShow] = useState(false);
  // Parse calendar dates locally, rather than interpreting YYYY-MM-DD as UTC.
  const date = mode === 'date' ? new Date(`${value}T12:00:00`) : new Date(`2000-01-01T${value}:00`);
  const update = (selectedDate: Date) => onChange(mode === 'date' ? formatLocalDate(selectedDate) : formatLocalTime(selectedDate));

  function openPicker() {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        mode, value: date, is24Hour: true,
        onValueChange: (_event, selectedDate) => update(selectedDate),
      });
    } else {
      setShow(true);
    }
  }

  return (
    <View style={{ gap: 16 }}>
      <Text style={[labStyles.title, { color: colors.text }]}>{value}</Text>
      <LabButton secondary label={`Choose ${mode}`} onPress={openPicker} />
      {show && Platform.OS === 'ios' && (
        <>
          <DateTimePicker mode={mode} value={date} display="spinner" themeVariant={colors.dark ? 'dark' : 'light'}
            textColor={colors.text} accentColor={colors.accent} onValueChange={(_event, selectedDate) => update(selectedDate)} />
          <LabButton secondary label="Done" onPress={() => setShow(false)} />
        </>
      )}
    </View>
  );
}
