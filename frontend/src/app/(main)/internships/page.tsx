import Button from '@/components/layout/Button';
import PageHeading from '@/components/PageHeading';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function InternshipsPage() {
  return (
    <section>
      <div className="container flex flex-col gap-4 md:gap-6">
        <PageHeading subText="Manage government internship opportunities">
          Internships Listings
        </PageHeading>

        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex w-54 items-center gap-2 rounded-md border border-stone-300 bg-white p-2 text-sm focus-within:ring-2 focus-within:ring-blue-500 md:w-80">
            <div>
              <Search size={18} className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search internships..."
              className="palceholder:text-sm w-full border-0 p-0 text-sm"
            />
          </div>

          <Link href="/add-internship">
            <Button>
              <Plus size={20} /> <p className="hidden md:block">New Internship</p>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
