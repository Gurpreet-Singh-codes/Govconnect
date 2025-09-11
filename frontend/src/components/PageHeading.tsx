import React from 'react';

export default function PageHeading({
  children,
  subText,
}: {
  children: React.ReactNode;
  subText?: string;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold md:text-3xl">{children}</h2>
      {subText && <p className="text-sm text-gray-500">{subText}</p>}
    </div>
  );
}
