import PageHeading from '@/components/PageHeading';
import React from 'react';

export default function ApplicationsPage() {
  return (
    <section>
      <div className="container flex flex-col gap-4 md:gap-6">
        <PageHeading subText="AI powered application management">Applications</PageHeading>
      </div>
    </section>
  );
}
