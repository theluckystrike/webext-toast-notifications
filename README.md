# webext-toast-notifications

[![npm version](https://img.shields.io/npm/v/webext-toast-notifications)](https://npmjs.com/package/webext-toast-notifications)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

In-page toast notifications for Chrome extensions. Supports success, error, warning, and info types with progress bars, stacking, auto-dismiss, and custom positioning. Built for Manifest V3. Zero dependencies.

---

INSTALL

```bash
npm install webext-toast-notifications
```

QUICK START

```typescript
import { Toast } from 'webext-toast-notifications';

Toast.success('File saved');
Toast.error('Connection lost');
Toast.warning('Disk space low');
Toast.info('Update available');
```

SHOWING A TOAST WITH OPTIONS

```typescript
Toast.show('Operation completed', {
  type: 'success',
  duration: 4000,
  position: 'top-right',
  closable: true,
});
```

PROGRESS BAR

Display a toast with an animated countdown bar that auto-dismisses when finished.

```typescript
Toast.progress('Uploading file...', 5000);
```

DISMISSING A TOAST

Every method returns the toast HTMLElement. Pass it to `dismiss` to remove it early.

```typescript
const el = Toast.info('Processing...');
Toast.dismiss(el);
```

API

All methods on the Toast class are static. There is no need to create an instance.

`Toast.show(message, options?)` -- Returns HTMLElement. Displays a toast with the given message and options.

`Toast.dismiss(toast)` -- Removes a toast element from the DOM with a fade-out animation.

`Toast.success(msg, duration?)` -- Shorthand for show with type set to success.

`Toast.error(msg, duration?)` -- Shorthand for show with type set to error.

`Toast.warning(msg, duration?)` -- Shorthand for show with type set to warning.

`Toast.info(msg, duration?)` -- Shorthand for show with type set to info.

`Toast.progress(message, durationMs?)` -- Shows a toast with an animated progress bar. Defaults to 3000ms. Auto-dismisses when the bar reaches zero.

TOAST OPTIONS

```
type        'success' | 'error' | 'warning' | 'info'                  default 'info'
duration    number (ms), use 0 to keep it visible indefinitely         default 4000
position    'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' default 'top-right'
closable    boolean, shows or hides the close button                   default true
```

HOW IT WORKS

The library injects a fixed-position container into the page DOM at the chosen screen corner. Each toast is a styled div with a colored left border matching its type. Toasts stack vertically with an 8px gap. Dismiss animations use a 300ms opacity fade before the element is removed.

The dark theme (background #1F2937, text #F9FAFB) works well on most pages without clashing. There is no external CSS to load.

LICENSE

MIT -- see LICENSE file.

CONTRIBUTING

Contributions are welcome. Fork the repo, make your changes, and open a pull request.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push and open a PR

RELATED

- [webext-tooltip](https://github.com/theluckystrike/webext-tooltip)
- [webext-progress-bar](https://github.com/theluckystrike/webext-progress-bar)
- [awesome-chrome-extensions-dev](https://github.com/theluckystrike/awesome-chrome-extensions-dev)

---

Built by theluckystrike at [zovo.one](https://zovo.one)
