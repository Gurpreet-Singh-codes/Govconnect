import Sidebar from '@/components/layout/Sidebar';
import React from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-screen grid-cols-1 overflow-hidden lg:grid-cols-[16rem_1fr]">
      <Sidebar />

      <div className="relative flex min-h-screen flex-1 flex-col overflow-y-auto">
        {/* Main content */}

        <main className="min-h-full bg-gray-100 p-4 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
