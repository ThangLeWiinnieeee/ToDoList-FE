/**
 * Button Component
 * Common button component
 */

'use client';

import React from 'react';
import THEME from '@/styles/theme';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  ...props
}) {
  const variantStyles = {
    primary: {
      backgroundColor: THEME.colors.primary,
      color: 'white',
    },
    secondary: {
      backgroundColor: THEME.colors.secondary,
      color: 'white',
    },
    danger: {
      backgroundColor: THEME.colors.error,
      color: 'white',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: THEME.colors.primary,
      border: `1px solid ${THEME.colors.primary}`,
    },
  };

  const sizeStyles = {
    sm: {
      padding: '6px 12px',
      fontSize: THEME.typography.fontSize.sm,
    },
    md: {
      padding: '10px 16px',
      fontSize: THEME.typography.fontSize.base,
    },
    lg: {
      padding: '12px 20px',
      fontSize: THEME.typography.fontSize.lg,
    },
  };

  const baseStyles = {
    border: 'none',
    borderRadius: THEME.borderRadius.md,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    fontWeight: THEME.typography.fontWeight.medium,
    transition: THEME.transition.base,
    ...variantStyles[variant],
    ...sizeStyles[size],
  };

  return (
    <button
      style={baseStyles}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
