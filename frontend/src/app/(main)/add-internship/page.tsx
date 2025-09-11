import InternshipForm from '@/components/forms/InternshipForm';
import PageHeading from '@/components/PageHeading';
import React from 'react';

export default function AddInternshipPage() {
  return (
    <section>
      <div className="container-sm flex flex-col gap-4 md:gap-6">
        <PageHeading subText="Add a new government internship opportunity.">
          Create New Internship
        </PageHeading>

        <InternshipForm />
      </div>
    </section>
  );
}
