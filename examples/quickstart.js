/**
 * webext-toast-notifications - Working Examples
 * 
 * This file demonstrates all features of the Toast library.
 * These examples work in any Chrome extension context (popup, options page, or content script).
 * 
 * Note: This library creates DOM elements, so it requires a page context (not background script).
 * 
 * Usage in extension:
 *   import { Toast } from 'webext-toast-notifications';
 */

// ============================================================================
// Example 1: Basic Toast Types
// ============================================================================
// Show different types of toast notifications

// Success toast - typically green, for successful operations
Toast.success('File saved successfully!');

// Error toast - typically red, for errors and failures
Toast.error('Failed to connect to server');

// Warning toast - typically yellow/orange, for warnings
Toast.warning('Disk space is running low');

// Info toast - typically blue, for informational messages
Toast.info('New version available for download');


// ============================================================================
// Example 2: Custom Toast with Full Options
// ============================================================================
// Using the full show() method with all available options

Toast.show('Operation completed!', {
    type: 'success',        // 'success' | 'error' | 'warning' | 'info'
    duration: 4000,        // milliseconds, 0 = never auto-dismiss
    position: 'top-right', // 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
    closable: true,        // show close button
});


// ============================================================================
// Example 3: Different Positions
// ============================================================================
// Toasts can appear in any corner of the screen

Toast.show('Top left toast', { position: 'top-left' });
Toast.show('Bottom right toast', { position: 'bottom-right' });
Toast.show('Bottom left toast', { position: 'bottom-left' });


// ============================================================================
// Example 4: Persistent Toasts (No Auto-Dismiss)
// ============================================================================
// Set duration to 0 to prevent auto-dismiss

const persistentToast = Toast.show('This toast will stay until manually closed', {
    duration: 0,        // 0 = never auto-dismiss
    closable: true,     // User can click X to close
});

// Later, you can dismiss it programmatically
// Toast.dismiss(persistentToast);


// ============================================================================
// Example 5: Progress Toast with Countdown
// ============================================================================
// Show a toast with an animated progress bar

// Upload progress (5 seconds)
Toast.progress('Uploading file...', 5000);

// Download progress (3 seconds)
Toast.progress('Downloading update...', 3000);


// ============================================================================
// Example 6: Manual Dismissal
// ============================================================================
// Programmatically dismiss toasts

// Show an info toast
const myToast = Toast.info('Processing your request...');

// Later, dismiss it manually (e.g., after operation completes)
setTimeout(() => {
    Toast.dismiss(myToast);
}, 1000);


// ============================================================================
// Example 7: Real-World Usage Patterns
// ============================================================================
// Common patterns for extension development

async function handleSaveOperation() {
    try {
        // Show progress toast while saving
        const progressToast = Toast.progress('Saving...', 3000);
        
        // Perform the save operation
        await saveDataToStorage();
        
        // Dismiss progress and show success
        Toast.dismiss(progressToast);
        Toast.success('Settings saved!', { duration: 2000 });
        
    } catch (error) {
        // Show error toast
        Toast.error('Failed to save settings. Please try again.');
        console.error('Save error:', error);
    }
}

async function handleFormSubmit(formData) {
    // Validate form
    if (!formData.email) {
        Toast.warning('Please enter your email address');
        return;
    }
    
    if (!formData.password) {
        Toast.warning('Please enter your password');
        return;
    }
    
    // Show loading state
    const loadingToast = Toast.info('Submitting form...', { duration: 0 });
    
    try {
        await submitForm(formData);
        Toast.dismiss(loadingToast);
        Toast.success('Form submitted successfully!');
    } catch (error) {
        Toast.dismiss(loadingToast);
        Toast.error('Form submission failed. Please try again.');
    }
}


// ============================================================================
// Example 8: Multiple Toasts (Stacking)
// ============================================================================
// The library automatically stacks multiple toasts

// Show multiple toasts in sequence - they'll appear one below another
Toast.success('First notification');
Toast.info('Second notification');
Toast.warning('Third notification');


// ============================================================================
// Example 9: Integration with Chrome Extension Popup
// ============================================================================
// Example: Using in a browser action popup HTML file
/*
 * 
 * In your popup.html, include the script:
 * 
 * <script type="module">
 *   import { Toast } from './toast.js';
 *   
 *   document.getElementById('save-btn').addEventListener('click', async () => {
 *     Toast.info('Saving...', { duration: 0 });
 *     
 *     try {
 *       await chrome.storage.local.set({ settings: getSettings() });
 *       Toast.success('Saved!');
 *     } catch (e) {
 *       Toast.error('Failed to save');
 *     }
 *   });
 * </script>
 * 
 */


// ============================================================================
// Example 10: Integration with Options Page
// ============================================================================
// Example: Using in an options page
/*
 * 
 * In your options.html or options.tsx:
 * 
 * import { Toast } from 'webext-toast-notifications';
 * 
 * // Handle theme toggle
 * document.getElementById('theme-toggle').addEventListener('change', async (e) => {
 *   const isDark = e.target.checked;
 *   
 *   await chrome.storage.sync.set({ theme: isDark ? 'dark' : 'light' });
 *   Toast.success(`Theme changed to ${isDark ? 'dark' : 'light'} mode`);
 * });
 * 
 * // Handle reset button
 * document.getElementById('reset-btn').addEventListener('click', async () => {
 *   if (confirm('Are you sure you want to reset all settings?')) {
 *     await chrome.storage.sync.clear();
 *     Toast.info('Settings have been reset');
 *   }
 * });
 * 
 */


// ============================================================================
// CSS Animation (Optional - for smoother animations)
// ============================================================================
// Add this to your extension's CSS for smoother slide-in animation
/*
 * 
 * @keyframes slideIn {
 *   from {
 *     transform: translateX(100%);
 *     opacity: 0;
 *   }
 *   to {
 *     transform: translateX(0);
 *     opacity: 1;
 *   }
 * }
 * 
 */


console.log('Toast notification examples loaded successfully!');
