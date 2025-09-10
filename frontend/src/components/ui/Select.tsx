/**
 * P360 Select Component - Dropdown Select Fields
 * Reusable select/dropdown components for P360 design system
 */

import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  helper?: string;
  options: SelectOption[];
  placeholder?: string;
  variant?: 'default' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helper,
  options,
  placeholder,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  className = '',
  id,
  disabled,
  ...props
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

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

  // Base select classes
  const baseClasses = [
    'block',
    'w-full',
    'rounded-md',
    'transition-colors',
    'duration-200',
    'focus:outline-none',
    'disabled:bg-gray-100',
    'disabled:border-gray-200',
    'disabled:text-gray-500',
    'disabled:cursor-not-allowed',
    'appearance-none',
    'pr-10' // Space for chevron icon
  ].join(' ');

  // Error state classes
  const errorClasses = error ? [
    'border-red-300',
    'focus:ring-red-500',
    'focus:border-red-500'
  ].join(' ') : '';

  // Combine all classes
  const selectClasses = [
    baseClasses,
    sizeClasses[size],
    error ? errorClasses : variantClasses[variant],
    fullWidth ? 'w-full' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}

      {/* Select Container */}
      <div className="relative">
        {/* Select Field */}
        <select
          {...props}
          id={selectId}
          disabled={disabled}
          className={selectClasses}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* Chevron Icon */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-400">▼</span>
        </div>
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

export default Select;
