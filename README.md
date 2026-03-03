# webext-toast-notifications — In-Page Toasts for Extensions

[![npm version](https://img.shields.io/npm/v/webext-toast-notifications)](https://npmjs.com/package/webext-toast-notifications)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Chrome Web Extension](https://img.shields.io/badge/Chrome-Web%20Extension-orange.svg)](https://developer.chrome.com/docs/extensions/)
[![CI Status](https://github.com/theluckystrike/webext-toast-notifications/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-toast-notifications/actions)
[![Discord](https://img.shields.io/badge/Discord-Zovo-blueviolet.svg?logo=discord)](https://discord.gg/zovo)
[![Website](https://img.shields.io/badge/Website-zovo.one-blue)](https://zovo.one)
[![GitHub Stars](https://img.shields.io/github/stars/theluckystrike/webext-toast-notifications?style=social)](https://github.com/theluckystrike/webext-toast-notifications)

> Success/error/warning/info toasts with progress bars, stacking, and auto-dismiss.

**webext-toast-notifications** provides beautiful in-page toast notifications for Chrome extensions. Show success messages, errors, warnings, and progress updates with automatic stacking and dismiss.

Part of the [Zovo](https://zovo.one) developer tools family.

## Features

- ✅ **Multiple Types** - Success, error, warning, info, and progress
- ✅ **Auto-Dismiss** - Automatically dismiss after configurable duration
- ✅ **Stacking** - Multiple toasts stack vertically
- ✅ **Progress Bars** - Show upload/download progress
- ✅ **TypeScript Support** - Full type definitions included

## Installation

```bash
npm install webext-toast-notifications
```

## Quick Start

```typescript
import { Toast } from 'webext-toast-notifications';

// Basic usage
Toast.success('Settings saved!');
Toast.error('Failed to save', 5000);
Toast.warning('Warning message');
Toast.info('Information');

// Progress toasts
Toast.progress('Uploading...', 3000);
```

## Usage Examples

### Success Toast

```typescript
Toast.success('Changes saved successfully!', 3000);
```

### Error Toast

```typescript
try {
  await saveSettings(data);
  Toast.success('Saved!');
} catch (error) {
  Toast.error('Failed to save: ' + error.message, 5000);
}
```

### Progress Toast

```typescript
const toast = Toast.progress('Uploading file...', 0);

// Update progress
toast.setProgress(50);

// Complete
toast.complete('Upload complete!');
```

### Custom Configuration

```typescript
import { Toast, ToastConfig } from 'webext-toast-notifications';

const config: ToastConfig = {
  position: 'bottom-right',
  duration: 3000,
  dismissible: true,
};

Toast.config(config);
```

## API

### Toast Methods

| Method | Description |
|--------|-------------|
| `Toast.success(message, duration?)` | Show success toast |
| `Toast.error(message, duration?)` | Show error toast |
| `Toast.warning(message, duration?)` | Show warning toast |
| `Toast.info(message, duration?)` | Show info toast |
| `Toast.progress(message, duration?)` | Show progress toast |
| `Toast.dismiss(id?)` | Dismiss a toast |

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/toast-feature`
3. **Make** your changes
4. **Test** your changes: `npm test`
5. **Commit** your changes: `git commit -m 'Add new feature'`
6. **Push** to the branch: `git push origin feature/toast-feature`
7. **Submit** a Pull Request

## Built by Zovo

Part of the [Zovo](https://zovo.one) developer tools family — privacy-first Chrome extensions built by developers, for developers.

## See Also

### Related Zovo Repositories

- [webext-quick-settings](https://github.com/theluckystrike/webext-quick-settings) - Settings panel
- [webext-tooltip](https://github.com/theluckystrike/webext-tooltip) - Tooltip component
- [chrome-storage-plus](https://github.com/theluckystrike/chrome-storage-plus) - Type-safe storage
- [chrome-extension-starter-mv3](https://github.com/theluckystrike/chrome-extension-starter-mv3) - Extension template

### Zovo Chrome Extensions

- [Zovo Tab Manager](https://chrome.google.com/webstore/detail/zovo-tab-manager) - Manage tabs efficiently
- [Zovo Focus](https://chrome.google.com/webstore/detail/zovo-focus) - Block distractions
- [Zovo Permissions Scanner](https://chrome.google.com/webstore/detail/zovo-permissions-scanner) - Check extension privacy grades

Visit [zovo.one](https://zovo.one) for more information.

## License

MIT — [Zovo](https://zovo.one)

---

*Built by developers, for developers. No compromises on privacy.*
