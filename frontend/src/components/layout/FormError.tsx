import React from 'react';

export default function FormError({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-normal text-red-500">{children}</p>;
}
