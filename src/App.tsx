import React from 'react';
import ClientApp from './ClientApp';
import AdminApp from './AdminApp';

export default function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  const isAdminPath = path.startsWith('/admin') || path.endsWith('admin.html');

  if (isAdminPath) {
    return <AdminApp />;
  }

  return <ClientApp />;
}
