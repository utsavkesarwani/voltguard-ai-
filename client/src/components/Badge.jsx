import React from 'react';
import { motion } from 'framer-motion';

const Badge = ({ children, variant = 'default', size = 'md', className = '' }) => {
  const variants = {
    default: { color: '#2563EB', bg: '#EFF6FF', border: 'rgba(37,99,235,0.2)' },
    safe: { color: '#15803D', bg: '#DCFCE7', border: '#BBF7D0' },
    low: { color: '#92400E', bg: '#FEF9C3', border: '#FEF08A' },
    medium: { color: '#C2410C', bg: '#FFF7ED', border: '#FED7AA' },
    critical: { color: '#B91C1C', bg: '#FEF2F2', border: '#FECACA' },
    purple: { color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE' },
    gray: { color: '#6B7280', bg: '#F9FAFB', border: '#E5E7EB' },
  };

  const sizes = {
    sm: { fontSize: '0.7rem', padding: '3px 8px' },
    md: { fontSize: '0.75rem', padding: '4px 10px' },
    lg: { fontSize: '0.8rem', padding: '6px 14px' },
  };

  const v = variants[variant] || variants.default;
  const s = sizes[size] || sizes.md;

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold rounded-full ${className}`}
      style={{
        color: v.color,
        background: v.bg,
        border: `1px solid ${v.border}`,
        fontSize: s.fontSize,
        padding: s.padding,
        letterSpacing: '0.02em',
      }}
    >
      {children}
    </span>
  );
};

export default Badge;
