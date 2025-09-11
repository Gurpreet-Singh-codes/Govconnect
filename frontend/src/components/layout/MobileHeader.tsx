'use client';
import Image from 'next/image';
import React from 'react';
import { Menu } from 'lucide-react';
import Button from './Button';
import { useSidebar } from '@/hooks/useSidebar';
import Link from 'next/link';

export default function MobileHeader() {
  const { openSidebar } = useSidebar();
  return (
    <header className="flex h-16 items-center justify-between border border-b-stone-200 px-4 lg:hidden">
      <Link href={'/dashboard'}>
        <div className="flex items-center gap-2">
          <div>
            <Image src="/emblem.png" alt="Logo" width={48} height={40} />
          </div>
          <div>
            <h1 className="text-sm font-semibold">GovConnect</h1>
            <p className="text-xs text-stone-500">AI Powered Internships</p>
          </div>
        </div>
      </Link>

      <Button variant="ghost" onClick={openSidebar}>
        <Menu size={20} />
      </Button>
    </header>
  );
}
