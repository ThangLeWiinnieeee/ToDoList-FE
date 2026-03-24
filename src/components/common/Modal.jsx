/**
 * Modal Component
 * Component modal dùng chung
 */

'use client';

import React from 'react';
import THEME from '@/styles/theme';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: THEME.zIndex.modal,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: THEME.borderRadius.lg,
          boxShadow: THEME.shadow.lg,
          maxWidth: '500px',
          width: '90%',
          maxHeight: '90vh',
          overflow: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: THEME.spacing.lg,
            borderBottom: `1px solid ${THEME.colors.gray200}`,
          }}
        >
          <h2 style={{ margin: 0, fontSize: THEME.typography.fontSize.lg }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: THEME.colors.gray500,
            }}
          >
            ×
          </button>
        </div>
        
        <div style={{ padding: THEME.spacing.lg }}>
          {children}
        </div>
      </div>
    </div>
  );
}
