import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Toast, type ToastOptions } from '../src/toast';

describe('Toast', () => {
	beforeEach(() => {
		// Reset the static container between tests
		Toast.setContainer?.(null);
		// Clear any existing toast containers
		document.body.innerHTML = '';
	});

	afterEach(() => {
		document.body.innerHTML = '';
	});

	describe('show()', () => {
		it('should create a toast element with the message', () => {
			const toast = Toast.show('Test message');

			expect(toast).toBeInstanceOf(HTMLElement);
			expect(toast.textContent).toContain('Test message');
		});

		it('should default to info type', () => {
			const toast = Toast.show('Test message');
			const iconSpan = toast.querySelector('span:first-child');

			expect(iconSpan?.textContent).toBe('ℹ');
		});

		it('should apply success type correctly', () => {
			const toast = Toast.show('Success message', { type: 'success' });
			const iconSpan = toast.querySelector('span:first-child');

			expect(iconSpan?.textContent).toBe('✓');
			expect(toast.style.borderLeft).toContain('#10B981');
		});

		it('should apply error type correctly', () => {
			const toast = Toast.show('Error message', { type: 'error' });
			const iconSpan = toast.querySelector('span:first-child');

			expect(iconSpan?.textContent).toBe('✕');
			expect(toast.style.borderLeft).toContain('#EF4444');
		});

		it('should apply warning type correctly', () => {
			const toast = Toast.show('Warning message', { type: 'warning' });
			const iconSpan = toast.querySelector('span:first-child');

			expect(iconSpan?.textContent).toBe('⚠');
			expect(toast.style.borderLeft).toContain('#F59E0B');
		});

		it('should apply info type correctly', () => {
			const toast = Toast.show('Info message', { type: 'info' });
			const iconSpan = toast.querySelector('span:first-child');

			expect(iconSpan?.textContent).toBe('ℹ');
			expect(toast.style.borderLeft).toContain('#3B82F6');
		});

		it('should create container at top-right position by default', () => {
			Toast.show('Test message');

			const container = document.getElementById('toast-container-top-right');
			expect(container).not.toBeNull();
			expect(container?.style.position).toBe('fixed');
			expect(container?.style.top).toBe('16px');
			expect(container?.style.right).toBe('16px');
		});

		it('should create container at custom position', () => {
			Toast.show('Test message', { position: 'bottom-left' });

			const container = document.getElementById('toast-container-bottom-left');
			expect(container).not.toBeNull();
			expect(container?.style.bottom).toBe('16px');
			expect(container?.style.left).toBe('16px');
		});

		it('should handle closable option', () => {
			const closableToast = Toast.show('Closable', { closable: true });
			const closeBtn = closableToast.querySelector('.toast-close');
			expect(closeBtn).not.toBeNull();

			const nonClosableToast = Toast.show('Not closable', { closable: false });
			const noCloseBtn = nonClosableToast.querySelector('.toast-close');
			expect(noCloseBtn).toBeNull();
		});

		it('should handle empty options', () => {
			const toast = Toast.show('Test', {});
			expect(toast).toBeInstanceOf(HTMLElement);
		});
	});

	describe('dismiss()', () => {
		it('should remove the toast element after fade out', async () => {
			const toast = Toast.show('Test message');
			expect(document.body.contains(toast)).toBe(true);

			Toast.dismiss(toast);

			// Element still exists but opacity is 0
			expect(toast.style.opacity).toBe('0');

			// After transition, element should be removed
			await new Promise(resolve => setTimeout(resolve, 350));
			expect(document.body.contains(toast)).toBe(false);
		});
	});

	describe('convenience methods', () => {
		it('success() should create a success toast', () => {
			const toast = Toast.success('Done!');
			expect(toast.textContent).toContain('Done!');
			expect(toast.style.borderLeft).toContain('#10B981');
		});

		it('error() should create an error toast', () => {
			const toast = Toast.error('Failed!');
			expect(toast.textContent).toContain('Failed!');
			expect(toast.style.borderLeft).toContain('#EF4444');
		});

		it('warning() should create a warning toast', () => {
			const toast = Toast.warning('Warning!');
			expect(toast.textContent).toContain('Warning!');
			expect(toast.style.borderLeft).toContain('#F59E0B');
		});

		it('info() should create an info toast', () => {
			const toast = Toast.info('Info!');
			expect(toast.textContent).toContain('Info!');
			expect(toast.style.borderLeft).toContain('#3B82F6');
		});

		it('convenience methods should accept custom duration', () => {
			const toast = Toast.success('Custom duration', 6000);
			expect(toast).toBeInstanceOf(HTMLElement);
		});
	});

	describe('progress()', () => {
		it('should create a toast with progress bar', () => {
			const toast = Toast.progress('Loading...', 3000);
			expect(toast.textContent).toContain('Loading...');

			const bar = toast.querySelector('div[style*="height: 3px"]');
			expect(bar).not.toBeNull();
		});

		it('should use default duration of 3000ms', () => {
			const toast = Toast.progress('Loading...');
			expect(toast).toBeInstanceOf(HTMLElement);
		});
	});

	describe('edge cases', ()	=> {
		it('should handle empty string message', () => {
			const toast = Toast.show('');
			expect(toast).toBeInstanceOf(HTMLElement);
		});

		it('should handle all position options', () => {
			const positions = ['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const;

			positions.forEach(position => {
				document.body.innerHTML = '';
				const toast = Toast.show('Test', { position });
				const containerId = `toast-container-${position}`;
				expect(document.getElementById(containerId)).not.toBeNull();
			});
		});

		it('should handle all type options', () => {
			const types = ['success', 'error', 'warning', 'info'] as const;

			types.forEach(type => {
				const toast = Toast.show('Test', { type });
				expect(toast).toBeInstanceOf(HTMLElement);
			});
		});

		it('should handle duration: 0 (no auto-dismiss)', () => {
			const toast = Toast.show('Persistent', { duration: 0 });
			expect(toast).toBeInstanceOf(HTMLElement);
		});

		it('should handle custom duration', () => {
			const toast = Toast.show('Custom duration', { duration: 5000 });
			expect(toast).toBeInstanceOf(HTMLElement);
		});
	});
});
