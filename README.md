# Mobile form elements

A simple Expo app with all 25 form elements on one scrollable page.

Enter values in any inputs you want to try, then tap **Submit** at the bottom. It logs the entire form as `console.log('Form submitted:', data)`. You can leave fields empty while testing individual inputs.

Examples include text, email, password, phone, URL, multiline text, search, PIN, checkbox, switch, radio buttons, dropdown, multiple selection, segmented control, color, whole numbers, decimals, slider, stepper, rating, date, time, files, photos, and camera.

- `src/app/index.tsx`: the page, form state, and Submit handler.
- `src/components/forms/form-field.tsx`: the input controls.
- `src/constants/form-examples.ts`: input labels and defaults.

Run the app with `npx expo start`. Run checks with `npx expo lint` and `npx tsc --noEmit`.

Files and photos stay local. Submit logs their metadata and URI. Test the camera on a device with a camera. Rebuild custom development builds after adding native modules.
