/**
 * Toast Notifications — In-page toast system for extension UIs
 */
export interface ToastOptions { type?: 'success' | 'error' | 'warning' | 'info'; duration?: number; position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'; closable?: boolean; }

export class Toast {
    private static container: HTMLElement | null = null;
    private static count = 0;

    private static getContainer(position: string): HTMLElement {
        const id = `toast-container-${position}`;
        let el = document.getElementById(id);
        if (el) return el;
        el = document.createElement('div'); el.id = id;
        const [vert, horiz] = position.split('-');
        Object.assign(el.style, { position: 'fixed', [vert]: '16px', [horiz]: '16px', zIndex: '999999', display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '360px' });
        document.body.appendChild(el);
        return el;
    }

    /** Show a toast */
    static show(message: string, options: ToastOptions = {}): HTMLElement {
        const { type = 'info', duration = 4000, position = 'top-right', closable = true } = options;
        const colors: Record<string, string> = { success: '#10B981', error: '#EF4444', warning: '#F59E0B', info: '#3B82F6' };
        const icons: Record<string, string> = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };
        const container = this.getContainer(position);
        const toast = document.createElement('div');
        Object.assign(toast.style, {
            background: '#1F2937', color: '#F9FAFB', padding: '12px 16px', borderRadius: '8px', borderLeft: `4px solid ${colors[type]}`,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontFamily: '-apple-system,sans-serif',
            animation: 'slideIn 0.3s ease', opacity: '1', transition: 'opacity 0.3s'
        });
        toast.innerHTML = `<span style="font-size:16px">${icons[type]}</span><span style="flex:1">${message}</span>${closable ? '<span style="cursor:pointer;opacity:0.5" class="toast-close">✕</span>' : ''}`;
        toast.querySelector('.toast-close')?.addEventListener('click', () => this.dismiss(toast));
        container.appendChild(toast);
        if (duration > 0) setTimeout(() => this.dismiss(toast), duration);
        return toast;
    }

    /** Dismiss a toast */
    static dismiss(toast: HTMLElement): void { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }

    /** Convenience methods */
    static success(msg: string, duration?: number): HTMLElement { return this.show(msg, { type: 'success', duration }); }
    static error(msg: string, duration?: number): HTMLElement { return this.show(msg, { type: 'error', duration }); }
    static warning(msg: string, duration?: number): HTMLElement { return this.show(msg, { type: 'warning', duration }); }
    static info(msg: string, duration?: number): HTMLElement { return this.show(msg, { type: 'info', duration }); }

    /** Show with progress bar */
    static progress(message: string, durationMs: number = 3000): HTMLElement {
        const toast = this.show(message, { duration: 0 });
        const bar = document.createElement('div');
        Object.assign(bar.style, { height: '3px', background: '#3B82F6', borderRadius: '2px', marginTop: '8px', width: '100%', transition: `width ${durationMs}ms linear` });
        toast.appendChild(bar);
        requestAnimationFrame(() => { bar.style.width = '0%'; });
        setTimeout(() => this.dismiss(toast), durationMs);
        return toast;
    }
}
