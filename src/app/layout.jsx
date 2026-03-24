/**
 * Root Layout
 * Layout gốc cho toàn app (chứa html, body, Providers)
 */

import './globals.css';
import Header from '@/components/layout/Header';
import { AuthProvider } from '@/contexts/AuthContext';
import { TodoProvider } from '@/contexts/TodoContext';

export const metadata = {
  title: 'Todo App',
  description: 'A simple todo application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <TodoProvider>
            <Header />
            <main className="bg-gray-50 min-h-screen">
              {children}
            </main>
          </TodoProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
