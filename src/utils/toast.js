class ToastManager extends EventTarget {
  constructor() {
    super();
    this.toasts = [];
  }

  show(message, type = 'success', duration = 3000) {
    const id = Math.random().toString(36).substring(2);
    const toast = { id, message, type, duration };
    this.toasts.push(toast);
    this.dispatchEvent(new CustomEvent('toast', { detail: this.toasts }));

    setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  remove(id) {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.dispatchEvent(new CustomEvent('toast', { detail: this.toasts }));
  }

  success(message, duration) { this.show(message, 'success', duration); }
  error(message, duration) { this.show(message, 'error', duration); }
  info(message, duration) { this.show(message, 'info', duration); }
}

export const toast = new ToastManager();
