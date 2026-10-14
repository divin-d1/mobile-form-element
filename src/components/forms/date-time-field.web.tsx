import type { DateTimeFieldProps } from './date-time-field';
import { useLabColors } from './lab-ui';

export default function DateTimeField({ mode, value, onChange }: DateTimeFieldProps) {
  const colors = useLabColors();
  return (
    <input aria-label={mode === 'date' ? 'Lesson date' : 'Lesson time'} type={mode} value={value}
      onChange={(event) => { if (event.target.value) onChange(event.target.value); }}
      style={{ boxSizing: 'border-box', width: '100%', minHeight: 48, border: `1px solid ${colors.border}`,
        padding: 14, fontSize: 16, fontFamily: 'inherit', backgroundColor: colors.card, color: colors.text, colorScheme: colors.dark ? 'dark' : 'light' }} />
  );
}
