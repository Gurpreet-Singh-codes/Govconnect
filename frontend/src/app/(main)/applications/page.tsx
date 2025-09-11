import PageHeading from '@/components/PageHeading';
import { Search } from 'lucide-react';
import React from 'react';

export default function ApplicationsPage() {
  return (
    <section>
      <div className="container flex flex-col gap-4 md:gap-6">
        <PageHeading subText="AI powered application management">Applications</PageHeading>

        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex w-80 items-center gap-2 rounded-md border border-stone-300 bg-white p-2 text-sm focus-within:ring-2 focus-within:ring-blue-500 md:w-120">
            <div>
              <Search size={18} className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search applicattions by name, university or major."
              className="palceholder:text-sm w-full border-0 p-0 text-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
