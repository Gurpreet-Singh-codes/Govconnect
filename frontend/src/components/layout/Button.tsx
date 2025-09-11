import React from 'react';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';

export type ButtonProps = {
  children: React.ReactNode;
  variant?: Variant;
  onClick?: () => void;
  className?: string;
};

const variantStyles: Record<Variant, string> = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2',
  danger: 'bg-red-600 text-white hover:bg-red-700 px-4 py-2',
  ghost: 'bg-transparent text-gray-800 ',
};

export default function Button({ children, variant = 'primary', onClick, className }: ButtonProps) {
  if (variant === 'ghost') {
    return (
      <button
        className={`${variantStyles[variant]} ${className} cursor-pointer rounded-md`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={`flex cursor-pointer items-center gap-2 rounded-md text-sm ${variantStyles[variant]} ${className} transition duration-300 disabled:cursor-not-allowed disabled:opacity-50`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
