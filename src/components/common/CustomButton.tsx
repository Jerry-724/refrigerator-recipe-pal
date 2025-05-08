
import React from 'react';
import { cn } from '@/lib/utils';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  ...props
}) => {
  return (
    <button
      className={cn(
        'rounded-full font-medium transition-colors focus:outline-none',
        {
          // Variants
          'bg-primary text-white hover:bg-primary/90': variant === 'default',
          'bg-gray-200 text-gray-700 hover:bg-gray-300': variant === 'secondary',
          'border border-primary text-primary hover:bg-primary/10': variant === 'outline',
          'text-primary hover:bg-primary/10': variant === 'ghost',
          
          // Sizes
          'px-3 py-1 text-sm': size === 'sm',
          'px-4 py-2': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
          
          // Width
          'w-full': fullWidth,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
