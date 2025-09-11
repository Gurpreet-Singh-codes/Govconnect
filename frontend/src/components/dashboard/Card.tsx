import React from 'react';

export default function Card({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-md border border-stone-200 bg-white p-4 ${className}`}>{children}</div>
  );
}
