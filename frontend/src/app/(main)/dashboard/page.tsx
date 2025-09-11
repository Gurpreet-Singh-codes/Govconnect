import PageHeading from '@/components/PageHeading';
import React from 'react';

export default function DashboardPage() {
  return (
    <section>
      <div className="container flex flex-col gap-4 md:gap-6">
        <PageHeading subText="Intelligent insights for government internship management">
          AI Powered Dashboard
        </PageHeading>
      </div>
    </section>
  );
}
