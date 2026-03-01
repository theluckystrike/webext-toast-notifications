# webext-toast-notifications — In-Page Toasts for Extensions
> **Built by [Zovo](https://zovo.one)** | `npm i webext-toast-notifications`

Success/error/warning/info toasts with progress bars, stacking, and auto-dismiss.

```typescript
import { Toast } from 'webext-toast-notifications';
Toast.success('Saved!');
Toast.error('Something went wrong', 5000);
Toast.progress('Uploading...', 3000);
```
MIT License
