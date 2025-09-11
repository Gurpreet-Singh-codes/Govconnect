import MobileHeader from '@/components/layout/MobileHeader';
import Sidebar from '@/components/layout/Sidebar';
import React from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-screen grid-cols-1 overflow-hidden lg:grid-cols-[16rem_1fr]">
      <Sidebar />

      <div className="relative flex min-h-screen flex-col overflow-hidden">
        <MobileHeader />
        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          <main className="min-h-full bg-gray-100 p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
