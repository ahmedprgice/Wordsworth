import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-brand-orange text-white hover:bg-brand-blue-dark shadow-md hover:shadow-lg': variant === 'primary',
            'bg-white text-brand-blue border-2 border-brand-blue hover:bg-brand-blue hover:text-white': variant === 'secondary',
            'border-2 border-gray-300 text-gray-700 hover:border-brand-blue hover:text-brand-blue': variant === 'outline',
            'text-brand-blue hover:bg-brand-blue/10': variant === 'ghost',
            'px-4 py-2': size === 'sm',
            'px-6 py-3': size === 'md',
            'px-8 py-4': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
