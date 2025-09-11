'use client';
import { useSidebar } from '@/hooks/useSidebar';
import { NavlinkType } from '@/types';
import {
  Briefcase,
  FileUser,
  LayoutDashboard,
  MessageCircle,
  Plus,
  Search,
  Upload,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export const navlinks: NavlinkType[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard size={16} />,
  },
  { label: 'Internships', href: '/internships', icon: <Briefcase size={16} /> },
  { label: 'Applications', href: '/applications', icon: <FileUser size={16} /> },
  { label: 'AI Assistant', href: '/ai-assistant', icon: <MessageCircle size={16} /> },
  { label: 'Smart Search', href: '/smart-search', icon: <Search size={16} /> },
];

export const quickLinks: NavlinkType[] = [
  {
    label: 'Add Internship',
    href: '/add-internship',
    icon: <Plus size={18} className="text-purple-700" />,
  },
  {
    label: 'Submit Application',
    href: '/submit-application',
    icon: <Upload size={18} className="text-green-600" />,
  },
];

export default function NavLinks() {
  const { closeSidebar } = useSidebar();
  const path = usePathname();

  return (
    <>
      <div>
        <header className="p-2 text-xs font-medium text-gray-500 uppercase">
          <p>NAVIGATION</p>
        </header>
        <ul className="flex flex-col gap-2 text-[13px] text-gray-700">
          {navlinks.map((link) => (
            <li key={link.href} onClick={closeSidebar}>
              <Link
                href={link.href}
                className={`flex items-center gap-2 rounded-sm p-2 transition duration-300 hover:bg-indigo-100/40 hover:text-indigo-500 ${path === link.href ? 'border-r-3 border-indigo-500 bg-indigo-100/40 text-indigo-500' : ''}`}
              >
                <span>{link.icon}</span>
                <span className="font-medium">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <header className="p-2 text-xs font-medium text-gray-500 uppercase">
          <p>Quick Links</p>
        </header>
        <ul className="flex flex-col gap-2 text-[13px] text-gray-700">
          {quickLinks.map((link) => (
            <li key={link.href} onClick={closeSidebar}>
              <Link
                href={link.href}
                className={`flex items-center gap-2 rounded-sm p-2 font-medium transition duration-300 hover:text-black ${path === link.href ? 'text-black' : ''}`}
              >
                <span>{link.icon}</span>
                <span className="font-medium">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
