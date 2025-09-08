/**
 * P360 Button Component - Figma Design System Implementation
 * Replaces basic button with P360 brand-aligned design system button
 */

import React from 'react';
import { Icon, IconName } from './icons';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button visual variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /** Button size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Icon to display (optional) */
  icon?: IconName;
  /** Icon position */
  iconPosition?: 'left' | 'right';
  /** Loading state */
  loading?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Custom className */
  className?: string;
  /** Children content */
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  fullWidth = false,
  className = '',
  children,
  disabled,
  ...props
}) => {
  // Base classes
  const baseClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'font-p360',
    'transition-all',
    'duration-200',
    'ease-in-out',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'active:transform',
    'active:scale-95'
  ].join(' ');

  // Size variants
  const sizeClasses = {
    xs: 'px-2 py-1 text-xs gap-1 rounded-p360-sm',
    sm: 'px-3 py-2 text-p360-body gap-2 rounded-p360-md',
    md: 'px-4 py-2.5 text-p360-body-medium gap-2 rounded-p360-md',
    lg: 'px-6 py-3 text-p360-subtitle gap-3 rounded-p360-lg',
    xl: 'px-8 py-4 text-p360-title gap-3 rounded-p360-lg'
  };

  // Variant classes
  const variantClasses = {
    primary: [
      'bg-p360-purple',
      'text-white',
      'border-transparent',
      'hover:bg-p360-purple-light',
      'focus:ring-p360-purple',
      'shadow-p360-sm',
      'hover:shadow-p360-md'
    ].join(' '),
    
    secondary: [
      'bg-p360-secondary-blue',
      'text-white',
      'border-transparent',
      'hover:bg-p360-primary-blue',
      'focus:ring-p360-secondary-blue',
      'shadow-p360-sm',
      'hover:shadow-p360-md'
    ].join(' '),
    
    outline: [
      'bg-transparent',
      'text-p360-purple',
      'border',
      'border-p360-purple',
      'hover:bg-p360-purple',
      'hover:text-white',
      'focus:ring-p360-purple'
    ].join(' '),
    
    ghost: [
      'bg-transparent',
      'text-p360-purple',
      'border-transparent',
      'hover:bg-p360-light-gray',
      'focus:ring-p360-purple'
    ].join(' '),
    
    danger: [
      'bg-status-error',
      'text-white',
      'border-transparent',
      'hover:bg-red-600',
      'focus:ring-red-500',
      'shadow-p360-sm',
      'hover:shadow-p360-md'
    ].join(' ')
  };

  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';

  // Loading classes
  const loadingClasses = loading ? 'opacity-70 cursor-wait' : '';

  // Combine all classes
  const buttonClasses = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    widthClasses,
    loadingClasses,
    className
  ].filter(Boolean).join(' ');

  // Icon size based on button size
  const iconSize = {
    xs: 'xs' as const,
    sm: 'sm' as const,
    md: 'sm' as const,
    lg: 'md' as const,
    xl: 'lg' as const
  };

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <svg
          className={`animate-spin ${iconSize[size] === 'xs' ? 'w-3 h-3' : iconSize[size] === 'sm' ? 'w-4 h-4' : 'w-5 h-5'}`}
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

      {/* Left icon */}
      {!loading && icon && iconPosition === 'left' && (
        <Icon name={icon} size={iconSize[size]} />
      )}

      {/* Button content */}
      {children}

      {/* Right icon */}
      {!loading && icon && iconPosition === 'right' && (
        <Icon name={icon} size={iconSize[size]} />
      )}
    </button>
  );
};

/**
 * Button variants for quick access
 */
export const PrimaryButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="primary" {...props} />
);

export const SecondaryButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="secondary" {...props} />
);

export const OutlineButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="outline" {...props} />
);

export const GhostButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="ghost" {...props} />
);

export const DangerButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="danger" {...props} />
);

/**
 * Icon-only button for toolbar actions
 */
export interface IconButtonProps extends Omit<ButtonProps, 'children' | 'icon'> {
  icon: IconName;
  'aria-label': string;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, ...props }) => {
  return (
    <Button {...props} className={`!px-2 ${props.className || ''}`}>
      <Icon name={icon} size={iconSize[props.size || 'md']} />
    </Button>
  );
};

const iconSize = {
  xs: 'xs' as const,
  sm: 'sm' as const,
  md: 'sm' as const,
  lg: 'md' as const,
  xl: 'lg' as const
};

export default Button;