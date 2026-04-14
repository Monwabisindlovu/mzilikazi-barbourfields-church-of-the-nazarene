import React from 'react';

export function Badge({ children, className = '', variant = 'default' }) {
  const variants = {
    default: 'bg-slate-900 text-white',
    secondary: 'bg-slate-100 text-slate-900',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
