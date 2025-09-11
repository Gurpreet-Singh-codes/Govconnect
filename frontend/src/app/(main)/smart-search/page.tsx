import PageHeading from '@/components/PageHeading';
import SearchBox from '@/components/smart-search/SearchBox';
import React from 'react';
import Suggestions from './Suggestions';

export default function SmartSearchPage() {
  return (
    <section>
      <div className="container flex flex-col gap-4 md:gap-6">
        <PageHeading subText="Search for exactly what you're looking for.">
          Smart Search
        </PageHeading>
        <SearchBox />
        <Suggestions />
      </div>
    </section>
  );
}
