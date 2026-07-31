import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

// ── Context
const ToastContext = createContext(null);

let toastId = 0;

const toastConfig = {
  success: {
    icon: CheckCircle,
    bg: '#F0FDF4',
    border: '#BBF7D0',
    iconColor: '#22C55E',
    textColor: '#15803D',
  },
  error: {
    icon: AlertCircle,
    bg: '#FEF2F2',
    border: '#FECACA',
    iconColor: '#EF4444',
    textColor: '#B91C1C',
  },
  warning: {
    icon: AlertTriangle,
    bg: '#FFFBEB',
    border: '#FDE68A',
    iconColor: '#F59E0B',
    textColor: '#92400E',
  },
  info: {
    icon: Info,
    bg: '#EFF6FF',
    border: '#BFDBFE',
    iconColor: '#2563EB',
    textColor: '#1D4ED8',
  },
};

// ── Individual Toast
const ToastItem = ({ id, type = 'info', message, onDismiss, duration = 4000 }) => {
  const config = toastConfig[type] || toastConfig.info;
  const IconComp = config.icon;

  React.useEffect(() => {
    const timer = setTimeout(() => onDismiss(id), duration);
    return () => clearTimeout(timer);
  }, [id, onDismiss, duration]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.92 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.9 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="flex items-start gap-3 px-4 py-3 rounded-2xl shadow-lg w-80 max-w-full pointer-events-auto"
      style={{
        background: config.bg,
        border: `1px solid ${config.border}`,
        boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
      }}
      role="alert"
      aria-live="polite"
    >
      <IconComp
        className="w-5 h-5 flex-shrink-0 mt-0.5"
        style={{ color: config.iconColor }}
      />
      <p
        className="flex-1 text-sm font-medium leading-snug"
        style={{ color: config.textColor }}
      >
        {message}
      </p>
      <button
        onClick={() => onDismiss(id)}
        className="flex-shrink-0 w-5 h-5 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
        style={{ color: config.textColor, cursor: 'pointer', background: 'none', border: 'none' }}
        aria-label="Dismiss notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
};

// ── Provider
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((message, type = 'info', duration = 4000) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  // Convenience helpers
  toast.success = (msg, dur) => toast(msg, 'success', dur);
  toast.error = (msg, dur) => toast(msg, 'error', dur);
  toast.warning = (msg, dur) => toast(msg, 'warning', dur);
  toast.info = (msg, dur) => toast(msg, 'info', dur);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Toast container — fixed bottom-right */}
      <div
        className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none"
        aria-label="Notifications"
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <ToastItem
              key={t.id}
              {...t}
              onDismiss={dismiss}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

// ── Hook
export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
};

export default ToastProvider;
