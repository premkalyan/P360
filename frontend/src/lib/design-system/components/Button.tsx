/**
 * P360 Design System - Button Component
 * Comprehensive button system with variants, sizes, and states
 */

import React from 'react';
import { designTokens } from '../tokens';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'base' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const getVariantStyles = (variant: ButtonProps['variant']) => {
  const baseStyles = {
    border: '1px solid transparent',
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: designTokens.typography.fontWeight.medium,
    textDecoration: 'none',
    outline: 'none',
  };

  switch (variant) {
    case 'primary':
      return {
        ...baseStyles,
        backgroundColor: designTokens.colors.primary[500],
        color: designTokens.colors.background.primary,
        borderColor: designTokens.colors.primary[500],
        ':hover': {
          backgroundColor: designTokens.colors.primary[600],
          borderColor: designTokens.colors.primary[600],
        },
        ':focus': {
          boxShadow: `0 0 0 3px ${designTokens.colors.primary[200]}`,
        },
        ':disabled': {
          backgroundColor: designTokens.colors.neutral[300],
          borderColor: designTokens.colors.neutral[300],
          color: designTokens.colors.neutral[500],
          cursor: 'not-allowed',
        },
      };

    case 'secondary':
      return {
        ...baseStyles,
        backgroundColor: designTokens.colors.neutral[100],
        color: designTokens.colors.neutral[700],
        borderColor: designTokens.colors.neutral[200],
        ':hover': {
          backgroundColor: designTokens.colors.neutral[200],
          borderColor: designTokens.colors.neutral[300],
        },
        ':focus': {
          boxShadow: `0 0 0 3px ${designTokens.colors.neutral[200]}`,
        },
      };

    case 'outline':
      return {
        ...baseStyles,
        backgroundColor: 'transparent',
        color: designTokens.colors.primary[500],
        borderColor: designTokens.colors.primary[500],
        ':hover': {
          backgroundColor: designTokens.colors.primary[50],
          borderColor: designTokens.colors.primary[600],
          color: designTokens.colors.primary[600],
        },
        ':focus': {
          boxShadow: `0 0 0 3px ${designTokens.colors.primary[200]}`,
        },
      };

    case 'ghost':
      return {
        ...baseStyles,
        backgroundColor: 'transparent',
        color: designTokens.colors.neutral[600],
        borderColor: 'transparent',
        ':hover': {
          backgroundColor: designTokens.colors.neutral[100],
          color: designTokens.colors.neutral[700],
        },
        ':focus': {
          boxShadow: `0 0 0 3px ${designTokens.colors.neutral[200]}`,
        },
      };

    case 'danger':
      return {
        ...baseStyles,
        backgroundColor: designTokens.colors.semantic.error[500],
        color: designTokens.colors.background.primary,
        borderColor: designTokens.colors.semantic.error[500],
        ':hover': {
          backgroundColor: designTokens.colors.semantic.error[600],
          borderColor: designTokens.colors.semantic.error[600],
        },
        ':focus': {
          boxShadow: `0 0 0 3px ${designTokens.colors.semantic.error[50]}`,
        },
      };

    default:
      return baseStyles;
  }
};

const getSizeStyles = (size: ButtonProps['size']) => {
  switch (size) {
    case 'sm':
      return {
        height: designTokens.components.button.height.sm,
        padding: designTokens.components.button.padding.sm,
        fontSize: designTokens.typography.fontSize.xs,
        borderRadius: designTokens.borderRadius.sm,
      };
    case 'lg':
      return {
        height: designTokens.components.button.height.lg,
        padding: designTokens.components.button.padding.lg,
        fontSize: designTokens.typography.fontSize.base,
        borderRadius: designTokens.borderRadius.lg,
      };
    case 'base':
    default:
      return {
        height: designTokens.components.button.height.base,
        padding: designTokens.components.button.padding.base,
        fontSize: designTokens.typography.fontSize.sm,
        borderRadius: designTokens.borderRadius.base,
      };
  }
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'base',
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  className = '',
  children,
  style,
  ...props
}) => {
  const variantStyles = getVariantStyles(variant);
  const sizeStyles = getSizeStyles(size);

  const buttonStyles = {
    ...variantStyles,
    ...sizeStyles,
    width: fullWidth ? '100%' : 'auto',
    gap: designTokens.spacing[2],
    fontFamily: designTokens.typography.fontFamily.sans.join(', '),
    opacity: loading || disabled ? 0.6 : 1,
    ...style,
  };

  const iconProps = {
    style: { 
      width: size === 'sm' ? '14px' : '16px',
      height: size === 'sm' ? '14px' : '16px',
    }
  };

  return (
    <button
      style={buttonStyles}
      disabled={disabled || loading}
      className={className}
      {...props}
    >
      {loading ? (
        <div style={{ 
          width: iconProps.style.width, 
          height: iconProps.style.height,
          border: '2px solid currentColor',
          borderRadius: '50%',
          borderTopColor: 'transparent',
          animation: 'spin 1s linear infinite',
        }} />
      ) : leftIcon ? (
        <span {...iconProps}>{leftIcon}</span>
      ) : null}
      
      {children}
      
      {rightIcon && !loading && (
        <span {...iconProps}>{rightIcon}</span>
      )}
    </button>
  );
};

// Convenient sub-components for common use cases
export const PrimaryButton = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="primary" {...props} />
);

export const SecondaryButton = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="secondary" {...props} />
);

export const OutlineButton = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="outline" {...props} />
);

export const GhostButton = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="ghost" {...props} />
);

export const DangerButton = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="danger" {...props} />
);
