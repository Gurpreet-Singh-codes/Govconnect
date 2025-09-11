'use client';

import { SidebarProvider } from '@/context/SidebarContext';
import React from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
