export type FormCategory = 'Text & typing' | 'Choices' | 'Numbers & dates' | 'Files & photos';
export type FormKind =
  | 'text' | 'email' | 'password' | 'phone' | 'number' | 'decimal' | 'url'
  | 'multiline' | 'search' | 'otp' | 'checkbox' | 'switch' | 'radio' | 'select'
  | 'multi-select' | 'segmented' | 'slider' | 'stepper' | 'rating' | 'date'
  | 'time' | 'color' | 'file' | 'image' | 'camera';

export type SelectedFile = {
  uri: string;
  name: string;
  mimeType: string | null;
  size: number | null;
  width?: number;
  height?: number;
};

export type FormValue = string | number | boolean | string[] | SelectedFile[];

export type FormExample = {
  id: FormKind;
  title: string;
  category: FormCategory;
  symbol: string;
  description: string;
  label: string;
  hint: string;
  placeholder?: string;
  initialValue: FormValue;
};

export const FORM_CATEGORIES: FormCategory[] = [
  'Text & typing', 'Choices', 'Numbers & dates', 'Files & photos',
];

// Each example renders an input on the single form page.
export const FORM_EXAMPLES: FormExample[] = [
  { id: 'text', title: 'Text input', category: 'Text & typing', symbol: 'Aa', description: 'A single line for names and other short answers.', label: 'Full name', hint: 'Type a name using the regular keyboard.', placeholder: 'e.g. Divin', initialValue: '' },
  { id: 'email', title: 'Email input', category: 'Text & typing', symbol: '@', description: 'An email-friendly keyboard with autofill and format validation.', label: 'Email address', hint: 'Use an address such as hello@example.com.', placeholder: 'hello@example.com', initialValue: '' },
  { id: 'password', title: 'Password input', category: 'Text & typing', symbol: '**', description: 'Hidden text with a button to show or hide what you typed.', label: 'Password', hint: 'Try the visibility button before submitting.', placeholder: 'Enter a practice password', initialValue: '' },
  { id: 'phone', title: 'Phone input', category: 'Text & typing', symbol: '+', description: 'A phone keypad for entering a telephone number.', label: 'Phone number', hint: 'You can include a country code, spaces, or parentheses.', placeholder: '+250 788 123 456', initialValue: '' },
  { id: 'url', title: 'Website input', category: 'Text & typing', symbol: '://', description: 'A URL keyboard for website addresses.', label: 'Website', hint: 'Include https:// or http:// in your address.', placeholder: 'https://example.com', initialValue: '' },
  { id: 'multiline', title: 'Text area', category: 'Text & typing', symbol: '¶', description: 'A larger text field for messages and longer answers.', label: 'Your message', hint: 'Press Return to add another line. Maximum 500 characters.', placeholder: 'What are you learning today?', initialValue: '' },
  { id: 'search', title: 'Search input', category: 'Text & typing', symbol: '?', description: 'A search field with a clear button and a search keyboard action.', label: 'Search query', hint: 'The keyboard Search key also submits your query.', placeholder: 'Search for something…', initialValue: '' },
  { id: 'otp', title: 'PIN / verification code', category: 'Text & typing', symbol: '123', description: 'A six-digit code field with numeric entry and one-time-code autofill.', label: 'Verification code', hint: 'Enter any six digits. This is a practice input; no SMS is sent.', placeholder: '000000', initialValue: '' },
  { id: 'checkbox', title: 'Checkbox', category: 'Choices', symbol: '✓', description: 'A checked or unchecked value for an independent choice.', label: 'Send me learning tips', hint: 'Submit either state to see a boolean: true or false.', initialValue: false },
  { id: 'switch', title: 'Switch / toggle', category: 'Choices', symbol: '⇄', description: 'A native on/off switch, commonly used for settings.', label: 'Enable notifications', hint: 'This practice switch only changes the value of the form.', initialValue: false },
  { id: 'radio', title: 'Radio buttons', category: 'Choices', symbol: '◉', description: 'A group of options where you can choose exactly one.', label: 'Choose your experience level', hint: 'Selecting another option replaces the current choice.', initialValue: 'Beginner' },
  { id: 'select', title: 'Dropdown / picker', category: 'Choices', symbol: '⌄', description: 'A platform picker for selecting one item from a list.', label: 'Choose a country', hint: 'Open the picker or scroll its wheel to choose a country.', initialValue: 'Rwanda' },
  { id: 'multi-select', title: 'Multiple selection', category: 'Choices', symbol: '☷', description: 'Selectable chips for choosing several options at once.', label: 'What would you like to learn?', hint: 'Tap each topic to add or remove it. You can also select none.', initialValue: [] },
  { id: 'segmented', title: 'Segmented control', category: 'Choices', symbol: '▥', description: 'A compact row of mutually exclusive choices.', label: 'Preferred platform', hint: 'Choose one platform to submit.', initialValue: 'Both' },
  { id: 'color', title: 'Color picker', category: 'Choices', symbol: '●', description: 'Choose a color swatch or enter your own hexadecimal color.', label: 'Favorite color', hint: 'Custom colors use six hex digits, for example #2563EB.', initialValue: '#2563EB' },
  { id: 'number', title: 'Number input', category: 'Numbers & dates', symbol: '42', description: 'A numeric keyboard for a whole-number answer.', label: 'Number of lessons', hint: 'Enter a whole number, zero or greater. The submitted value is a number.', placeholder: 'e.g. 12', initialValue: '' },
  { id: 'decimal', title: 'Decimal input', category: 'Numbers & dates', symbol: '.5', description: 'A decimal keyboard for amounts and measurements.', label: 'Amount', hint: 'Use a dot or comma as the decimal separator.', placeholder: 'e.g. 19.99', initialValue: '' },
  { id: 'slider', title: 'Slider', category: 'Numbers & dates', symbol: '↔', description: 'Drag a slider to choose a value within a range.', label: 'Volume', hint: 'Choose a value from 0 to 100.', initialValue: 50 },
  { id: 'stepper', title: 'Stepper / counter', category: 'Numbers & dates', symbol: '±', description: 'Plus and minus buttons for changing a number in steps.', label: 'Quantity', hint: 'Increase or decrease the quantity between 0 and 20.', initialValue: 1 },
  { id: 'rating', title: 'Star rating', category: 'Numbers & dates', symbol: '★', description: 'Tap a star to choose a rating from one to five.', label: 'How was your lesson?', hint: 'Tap a star to rate, or clear the rating to return to zero.', initialValue: 0 },
  { id: 'date', title: 'Date picker', category: 'Numbers & dates', symbol: '31', description: 'Choose a calendar date using the device’s date picker.', label: 'Lesson date', hint: 'The submitted date uses YYYY-MM-DD in your local time zone.', initialValue: '' },
  { id: 'time', title: 'Time picker', category: 'Numbers & dates', symbol: ':', description: 'Choose a time using the device’s time picker.', label: 'Lesson time', hint: 'The submitted time uses the 24-hour format HH:mm.', initialValue: '' },
  { id: 'file', title: 'File picker', category: 'Files & photos', symbol: '↥', description: 'Open the system file picker to attach one or more documents.', label: 'Attachments', hint: 'Submit logs the selected files’ names, URIs, types, and sizes.', initialValue: [] },
  { id: 'image', title: 'Photo picker', category: 'Files & photos', symbol: '▧', description: 'Choose a photo from your library and preview it.', label: 'Your photo', hint: 'Choose a photo, then submit its file details.', initialValue: [] },
  { id: 'camera', title: 'Camera input', category: 'Files & photos', symbol: '◎', description: 'Take a photo with the camera and use it as a form attachment.', label: 'Take a photo', hint: 'Try this on a device with a camera. Access is requested when you tap the button.', initialValue: [] },
];

export function getInitialValue(example: FormExample): FormValue {
  if (example.id === 'date') return formatLocalDate(new Date());
  if (example.id === 'time') return formatLocalTime(new Date());
  return Array.isArray(example.initialValue) ? [] : example.initialValue;
}

export function formatLocalDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function formatLocalTime(date: Date) {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

export function validateValue(kind: FormKind, value: FormValue): string | null {
  const text = typeof value === 'string' ? value.trim() : '';
  if (['text', 'email', 'password', 'phone', 'url', 'multiline', 'search', 'otp', 'number', 'decimal'].includes(kind) && !text) return 'Enter a value before submitting.';
  if (kind === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) return 'Enter a valid email address.';
  if (kind === 'phone' && (!/^[+\d\s().-]+$/.test(text) || text.replace(/\D/g, '').length < 7)) return 'Enter a phone number with at least seven digits.';
  if (kind === 'url') {
    try {
      const url = new URL(text);
      if (!['https:', 'http:'].includes(url.protocol) || !url.hostname) return 'Enter a valid http:// or https:// address.';
    } catch { return 'Enter a valid http:// or https:// address.'; }
  }
  if (kind === 'otp' && !/^\d{6}$/.test(text)) return 'Enter exactly six digits.';
  if (kind === 'number' && (!/^\d+$/.test(text) || !Number.isSafeInteger(Number(text)))) return 'Enter a valid whole number, zero or greater.';
  if (kind === 'decimal' && (!/^\d+([.,]\d+)?$/.test(text) || !Number.isFinite(Number(text.replace(',', '.'))))) return 'Enter a valid positive amount, such as 19.99.';
  if (kind === 'color' && !/^#[\da-f]{6}$/i.test(text)) return 'Enter a six-digit hex color, such as #2563EB.';
  if (['file', 'image', 'camera'].includes(kind) && Array.isArray(value) && value.length === 0) return 'Choose a file or photo before submitting.';
  return null;
}

export function getSubmittedValue(kind: FormKind, value: FormValue): FormValue {
  if (kind === 'number' || kind === 'decimal') {
    const text = String(value).trim().replace(',', '.');
    if (text && Number.isFinite(Number(text))) return Number(text);
  }
  return value;
}
