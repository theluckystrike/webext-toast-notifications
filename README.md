# webext-toast-notifications

> In-page toast notifications for Chrome extensions -- success/error/info/warning toasts, progress bars, stacking, auto-dismiss, and custom styling for MV3.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Install

```bash
npm install webext-toast-notifications
```

## Usage

```typescript
import { Toast } from 'webext-toast-notifications';

// Show a toast with full options
Toast.show('Operation completed', {
  type: 'success',
  duration: 4000,
  position: 'top-right',
  closable: true,
});

// Convenience methods for each type
Toast.success('File saved successfully');
Toast.error('Failed to connect');
Toast.warning('Disk space is running low');
Toast.info('New version available');

// Show a toast with a countdown progress bar
Toast.progress('Uploading file...', 5000);

// Manually dismiss a toast
const toast = Toast.info('Processing...');
Toast.dismiss(toast);
```

## API

### `ToastOptions` (interface)

Configuration object for toast display.

| Property   | Type                                                             | Default        | Description                          |
| ---------- | ---------------------------------------------------------------- | -------------- | ------------------------------------ |
| `type`     | `'success' \| 'error' \| 'warning' \| 'info'`                   | `'info'`       | Visual style and icon of the toast.  |
| `duration` | `number`                                                         | `4000`         | Auto-dismiss delay in milliseconds. Use `0` to disable auto-dismiss. |
| `position` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'`  | `'top-right'`  | Screen corner for toast placement.   |
| `closable` | `boolean`                                                        | `true`         | Whether to show a close button.      |

### `Toast` (class)

All methods are **static** -- there is no need to instantiate the class.

#### `static show(message: string, options?: ToastOptions): HTMLElement`

Displays a toast notification with the given message and options.

- **message** (`string`) -- The text to display.
- **options** (`ToastOptions`, optional) -- Display configuration.
- **Returns** `HTMLElement` -- The toast DOM element.

#### `static dismiss(toast: HTMLElement): void`

Fades out and removes a toast element from the DOM.

- **toast** (`HTMLElement`) -- The toast element to remove.

#### `static success(msg: string, duration?: number): HTMLElement`

Shorthand for `show(msg, { type: 'success', duration })`.

- **msg** (`string`) -- The message text.
- **duration** (`number`, optional) -- Auto-dismiss delay in milliseconds.
- **Returns** `HTMLElement` -- The toast DOM element.

#### `static error(msg: string, duration?: number): HTMLElement`

Shorthand for `show(msg, { type: 'error', duration })`.

- **msg** (`string`) -- The message text.
- **duration** (`number`, optional) -- Auto-dismiss delay in milliseconds.
- **Returns** `HTMLElement` -- The toast DOM element.

#### `static warning(msg: string, duration?: number): HTMLElement`

Shorthand for `show(msg, { type: 'warning', duration })`.

- **msg** (`string`) -- The message text.
- **duration** (`number`, optional) -- Auto-dismiss delay in milliseconds.
- **Returns** `HTMLElement` -- The toast DOM element.

#### `static info(msg: string, duration?: number): HTMLElement`

Shorthand for `show(msg, { type: 'info', duration })`.

- **msg** (`string`) -- The message text.
- **duration** (`number`, optional) -- Auto-dismiss delay in milliseconds.
- **Returns** `HTMLElement` -- The toast DOM element.

#### `static progress(message: string, durationMs?: number): HTMLElement`

Shows a toast with an animated progress bar that counts down, then auto-dismisses.

- **message** (`string`) -- The message text.
- **durationMs** (`number`, default `3000`) -- Total duration in milliseconds.
- **Returns** `HTMLElement` -- The toast DOM element.

## License

MIT
