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
      <h2 className="text-xl font-bold md:text-3xl">{children}</h2>
      {subText && <p className="mt-1 text-sm text-gray-500">{subText}</p>}
    </div>
  );
}
