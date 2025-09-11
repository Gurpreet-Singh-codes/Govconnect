'use client';
import React from 'react';
import NavLinks from '../sidebar/NavLinks';
import Image from 'next/image';
import Button from './Button';
import { X } from 'lucide-react';
import { useSidebar } from '@/hooks/useSidebar';

export default function MobileSidebar() {
  const { isOpen, closeSidebar } = useSidebar();
  return (
    <>
      <aside
        className={`fixed z-50 flex h-full w-84 flex-col border-r border-stone-200 bg-white lg:hidden ${
          isOpen ? 'left-0' : '-left-100'
        } transition-all duration-300`}
      >
        <header className="flex h-16 items-center justify-between border-b border-stone-200 px-4">
          <div className="flex items-center gap-2">
            <div>
              <Image src="/emblem.png" alt="Logo" width={48} height={48} />
            </div>
            <div>
              <h1 className="text-sm font-semibold">GovConnect</h1>
              <p className="text-xs text-stone-500">AI Powered Internships</p>
            </div>
          </div>

          <Button variant="ghost" onClick={closeSidebar} className="p-2">
            <X size={20} />
          </Button>
        </header>
        <div className="p-5">
          <NavLinks />
        </div>
      </aside>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={closeSidebar} />
      )}
    </>
  );
}
