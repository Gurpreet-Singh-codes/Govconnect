import PageHeading from '@/components/PageHeading';
import React from 'react';

export default function InternshipsPage() {
  return (
    <section>
      <div className="container flex flex-col gap-4 md:gap-6">
        <PageHeading subText="Manage government internship opportunities">
          Internships Listings
        </PageHeading>
      </div>
    </section>
  );
}
