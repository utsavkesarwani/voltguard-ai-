import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

/**
 * Loader — Branded async loading state
 * Props: message (string, optional), fullPage (bool, default false),
 *        size ('sm' | 'md' | 'lg', default 'md')
 */
const Loader = ({ message = 'Loading…', fullPage = false, size = 'md' }) => {
  const sizes = {
    sm: { spinner: 'w-8 h-8', border: 'border-2', icon: 'w-3 h-3' },
    md: { spinner: 'w-14 h-14', border: 'border-[3px]', icon: 'w-5 h-5' },
    lg: { spinner: 'w-20 h-20', border: 'border-4', icon: 'w-7 h-7' },
  };
  const s = sizes[size] || sizes.md;

  const inner = (
    <div className="flex flex-col items-center gap-5">
      {/* Spinner ring + icon */}
      <div className="relative">
        <div
          className={`${s.spinner} rounded-full ${s.border} border-transparent animate-spin`}
          style={{
            borderTopColor: 'var(--color-primary)',
            borderRightColor: 'rgba(37,99,235,0.3)',
            borderBottomColor: 'rgba(37,99,235,0.1)',
          }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center rounded-full"
          style={{ background: 'var(--color-primary-light)' }}
        >
          <Zap className={`${s.icon} animate-pulse`} style={{ color: 'var(--color-primary)' }} />
        </div>
      </div>

      {/* Message */}
      <AnimatePresence mode="wait">
        <motion.p
          key={message}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="text-sm font-medium text-center"
          style={{ color: 'var(--color-heading)' }}
        >
          {message}
        </motion.p>
      </AnimatePresence>
    </div>
  );

  if (fullPage) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--color-bg)' }}
      >
        {inner}
      </div>
    );
  }

  return inner;
};

export default Loader;
