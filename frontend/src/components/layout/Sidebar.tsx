import React from 'react';
import Image from 'next/image';
import NavLinks from '../sidebar/NavLinks';
import MobileSidebar from './MobileSidebar';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <>
      <aside className="hidden flex-col border-r border-stone-200 lg:flex">
        <header className="border-b border-stone-200 p-4">
          <Link href={'/dashboard'}>
            <div className="flex items-center gap-2">
              <div>
                <Image src="/images/emblem.png" alt="Logo" width={48} height={38} />
              </div>
              <div>
                <h1 className="text-sm font-semibold">GovConnect</h1>
                <p className="text-xs text-stone-500">AI Powered Internships</p>
              </div>
            </div>
          </Link>
        </header>
        <div className="p-5">
          <NavLinks />
        </div>
      </aside>
      <MobileSidebar />
    </>
  );
}
