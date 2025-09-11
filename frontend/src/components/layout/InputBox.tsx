import React from 'react';
import { FieldErrors, FieldValues } from 'react-hook-form';
import FormError from './FormError';

export default function InputBox({
  children,
  label,
  error,
  padding
}: {
  children: React.ReactNode;
  label: string;
  error: FieldValues | FieldErrors | undefined;
  padding?: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-600">{label}</label>
        {error && <FormError>{String(error?.message)}</FormError>}
      </div>
      <div className={`mt-2 flex items-center gap-2 rounded-md border border-stone-300  transition duration-200 focus-within:border-stone-800 p-2 ${padding}`}>
        {children}
      </div>
    </div>
  );
}
