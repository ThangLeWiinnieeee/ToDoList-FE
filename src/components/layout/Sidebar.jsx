/**
 * Sidebar Component
 * Thanh menu bên hông (chứa danh sách Tags)
 */

'use client';

import React from 'react';

export default function Sidebar() {
  return (
    <aside
      style={{
        width: '250px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRight: '1px solid #e0e0e0',
        minHeight: '100vh',
      }}
    >
      <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
        Tags
      </h2>
      
      {/* Tag list will be rendered here */}
    </aside>
  );
}
