/**
 * Loading Component
 * Component hiển thị loading state
 */

'use client';

import React from 'react';
import THEME from '@/styles/theme';

export default function Loading({ fullScreen = false, message = 'Đang tải...' }) {
  const container = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: THEME.spacing.md,
    ...(fullScreen && {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    }),
    ...(!fullScreen && {
      padding: THEME.spacing.lg,
      minHeight: '200px',
    }),
  };

  const spinner = {
    width: '40px',
    height: '40px',
    border: `4px solid ${THEME.colors.gray200}`,
    borderTop: `4px solid ${THEME.colors.primary}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  return (
    <>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
      <div style={container}>
        <div style={spinner} />
        <p style={{ margin: 0, color: THEME.colors.gray600 }}>
          {message}
        </p>
      </div>
    </>
  );
}
