import React, { useEffect, useState } from 'react';
import { toast } from '../../utils/toast';
import './ToastContainer.css';

export function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleToast = (e) => setToasts(e.detail);
    toast.addEventListener('toast', handleToast);
    return () => toast.removeEventListener('toast', handleToast);
  }, []);

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          {t.message}
        </div>
      ))}
    </div>
  );
}
