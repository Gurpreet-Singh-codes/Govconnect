import PageHeading from '@/components/PageHeading';
import React from 'react';

export default function SmartSearchPage() {
  return (
    <section>
      <div className="container flex flex-col gap-4 md:gap-6">
        <PageHeading subText="Search for exactly what you're looking for.">
          Smart Search
        </PageHeading>
      </div>
    </section>
  );
}
