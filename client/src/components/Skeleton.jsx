import React from 'react';

/* Single shimmer bar */
const SkeletonBar = ({ width = '100%', height = '12px', rounded = '6px', className = '' }) => (
  <div
    className={`animate-shimmer ${className}`}
    style={{ width, height, borderRadius: rounded, display: 'block' }}
  />
);

/**
 * Skeleton — Shimmer loading placeholder
 * Variants: 'statCard' | 'resultCard' | 'tableRow' | 'text'
 */
const Skeleton = ({ variant = 'text', count = 1 }) => {
  if (variant === 'statCard') {
    return (
      <div
        className="card p-5 flex flex-col gap-3"
        style={{ borderRadius: '20px' }}
      >
        <SkeletonBar width="40px" height="40px" rounded="12px" />
        <SkeletonBar width="70%" height="32px" rounded="8px" />
        <SkeletonBar width="50%" height="14px" />
      </div>
    );
  }

  if (variant === 'resultCard') {
    return (
      <div className="card p-7 flex flex-col gap-5" style={{ borderRadius: '24px' }}>
        <div className="flex gap-4">
          <SkeletonBar width="48px" height="48px" rounded="16px" />
          <div className="flex-1 flex flex-col gap-2">
            <SkeletonBar width="40%" height="10px" />
            <SkeletonBar width="65%" height="24px" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <SkeletonBar height="60px" rounded="12px" />
          <SkeletonBar height="60px" rounded="12px" />
        </div>
        <SkeletonBar height="12px" />
        <SkeletonBar height="80px" rounded="16px" />
        <SkeletonBar height="80px" rounded="16px" />
        <SkeletonBar height="80px" rounded="16px" />
      </div>
    );
  }

  if (variant === 'tableRow') {
    return Array.from({ length: count }).map((_, i) => (
      <tr key={i} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
        <td className="px-6 py-4"><SkeletonBar width="70%" height="14px" /></td>
        <td className="px-6 py-4"><SkeletonBar width="60px" height="22px" rounded="999px" /></td>
        <td className="px-6 py-4"><SkeletonBar width="40px" height="14px" /></td>
        <td className="px-6 py-4"><SkeletonBar width="80px" height="14px" /></td>
        <td className="px-6 py-4"><SkeletonBar width="40px" height="14px" /></td>
      </tr>
    ));
  }

  // default: text lines
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonBar
          key={i}
          width={i === count - 1 ? '60%' : '100%'}
          height="14px"
        />
      ))}
    </div>
  );
};

export default Skeleton;
