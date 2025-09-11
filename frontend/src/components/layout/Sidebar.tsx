import React from 'react';
import Image from 'next/image';
import NavLinks from '../sidebar/NavLinks';

export default function Sidebar() {
  return (
    <aside className="flex flex-col border-r border-stone-200">
      <header className="border-b border-stone-200 p-4">
        <div className="flex items-center gap-2">
          <div>
            <Image src="/images/emblem.png" alt="Logo" width={48} height={48} />
          </div>
          <div>
            <h1 className="text-sm font-semibold">GovConnect</h1>
            <p className="text-xs text-stone-500">AI Powered Internships</p>
          </div>
        </div>
      </header>
      <div className="p-4">
        <NavLinks />
      </div>
    </aside>
  );
}
