import { useState } from 'react';
import { Button, Keyboard, Text, View } from 'react-native';

import FormField from '@/components/forms/form-field';
import { LabScreen, labStyles, useLabColors } from '@/components/forms/lab-ui';
import {
  FORM_EXAMPLES,
  getInitialValue,
  getSubmittedValue,
  type FormKind,
  type FormValue,
} from '@/constants/form-examples';

type FormValues = Record<FormKind, FormValue>;

export default function HomeScreen() {
  const colors = useLabColors();
  const [values, setValues] = useState<FormValues>(() =>
    Object.fromEntries(FORM_EXAMPLES.map((example) => [example.id, getInitialValue(example)])) as FormValues
  );
  const [busyFields, setBusyFields] = useState<Partial<Record<FormKind, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const busy = Object.values(busyFields).some(Boolean);

  function submit() {
    Keyboard.dismiss();
    const data = Object.fromEntries(
      FORM_EXAMPLES.map((example) => [
        example.id,
        getSubmittedValue(example.id, values[example.id]),
      ])
    );
    console.log('Form submitted:', data);
    setSubmitted(true);
  }

  return (
    <LabScreen>
      <Text style={[labStyles.title, { color: colors.text }]}>Mobile form elements</Text>
      {FORM_EXAMPLES.map((example, index) => (
        <View key={example.id} style={{ gap: 8, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border }}>
          <Text style={[labStyles.label, { color: colors.text }]}>{index + 1}. {example.title}</Text>
          <Text style={[labStyles.hint, { color: colors.muted }]}>{example.label}</Text>
          <FormField
            example={example}
            value={values[example.id]}
            onChange={(value) => {
              setValues((current) => ({ ...current, [example.id]: value }));
              setSubmitted(false);
            }}
            onSubmit={Keyboard.dismiss}
            onBusyChange={(isBusy) => setBusyFields((current) => ({ ...current, [example.id]: isBusy }))}
          />
        </View>
      ))}
      <Button title="Submit" onPress={submit} disabled={busy} />
      {submitted && <Text accessibilityLiveRegion="polite" style={{ color: colors.text }}>Submitted! Check the console for your form data.</Text>}
    </LabScreen>
  );
}
