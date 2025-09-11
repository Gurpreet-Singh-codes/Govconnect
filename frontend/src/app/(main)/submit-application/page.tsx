import PageHeading from '@/components/PageHeading';
import React from 'react';

export default function SubmitApplicationPage() {
  return (
    <section>
      <div className="container-sm flex flex-col gap-4 md:gap-6">
        <PageHeading subText="Apply for a government internship opportunity">
          Submit Application
        </PageHeading>
      </div>
    </section>
  );
}
