import { NavlinkType } from '@/types';
import { Briefcase, FileUser, LayoutDashboard, MessageCircle, Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const navlinks: NavlinkType[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard />,
  },
  { label: 'Internships', href: '/internships', icon: <Briefcase /> },
  { label: 'Applications', href: '/applications', icon: <FileUser /> },
  { label: 'AI Assistant', href: '/ai-assistant', icon: <MessageCircle /> },
  { label: 'Smart Search', href: '/smart-search', icon: <Search /> },
];

export default function NavLinks() {
  return (
    <div>
      <ul className="flex flex-col gap-2 text-sm">
        {navlinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="flex items-center gap-2 p-2 hover:bg-gray-100">
              {link.icon}
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
