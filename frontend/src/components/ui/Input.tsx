/**
 * P360 Input Component - Form Input Fields
 * Reusable input components for P360 design system
 */

import React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helper,
  leftIcon,
  rightIcon,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  className = '',
  id,
  disabled,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-5 py-3 text-lg'
  };

  // Variant classes
  const variantClasses = {
    default: [
      'bg-white',
      'border',
      'border-gray-300',
      'focus:ring-2',
      'focus:ring-p360-purple',
      'focus:border-p360-purple'
    ].join(' '),
    filled: [
      'bg-gray-50',
      'border',
      'border-gray-200',
      'focus:bg-white',
      'focus:ring-2',
      'focus:ring-p360-purple',
      'focus:border-p360-purple'
    ].join(' ')
  };

  // Base input classes
  const baseClasses = [
    'block',
    'w-full',
    'rounded-md',
    'transition-colors',
    'duration-200',
    'placeholder-gray-500',
    'focus:outline-none',
    'disabled:bg-gray-100',
    'disabled:border-gray-200',
    'disabled:text-gray-500',
    'disabled:cursor-not-allowed'
  ].join(' ');

  // Error state classes
  const errorClasses = error ? [
    'border-red-300',
    'focus:ring-red-500',
    'focus:border-red-500'
  ].join(' ') : '';

  // Icon classes
  const hasLeftIcon = Boolean(leftIcon);
  const hasRightIcon = Boolean(rightIcon);
  const iconPadding = hasLeftIcon ? 'pl-10' : hasRightIcon ? 'pr-10' : '';

  // Combine all classes
  const inputClasses = [
    baseClasses,
    sizeClasses[size],
    error ? errorClasses : variantClasses[variant],
    iconPadding,
    fullWidth ? 'w-full' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-gray-400">
              {leftIcon}
            </div>
          </div>
        )}

        {/* Input Field */}
        <input
          {...props}
          id={inputId}
          disabled={disabled}
          className={inputClasses}
        />

        {/* Right Icon */}
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="text-gray-400">
              {rightIcon}
            </div>
          </div>
        )}
      </div>

      {/* Helper Text */}
      {helper && !error && (
        <p className="mt-1 text-sm text-gray-500">
          {helper}
        </p>
      )}

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
