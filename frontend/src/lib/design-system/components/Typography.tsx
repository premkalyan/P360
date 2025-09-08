/**
 * P360 Design System - Typography Component
 * Centralized typography component with consistent styling
 */

import React from 'react';
import { designTokens } from '../tokens';

export interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'small';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'muted' | 'inverse' | 'success' | 'warning' | 'error';
  align?: 'left' | 'center' | 'right';
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

const variantStyles = {
  h1: {
    fontSize: designTokens.typography.fontSize['4xl'],
    fontWeight: designTokens.typography.fontWeight.bold,
    lineHeight: designTokens.typography.lineHeight.tight,
  },
  h2: {
    fontSize: designTokens.typography.fontSize['3xl'],
    fontWeight: designTokens.typography.fontWeight.bold,
    lineHeight: designTokens.typography.lineHeight.tight,
  },
  h3: {
    fontSize: designTokens.typography.fontSize['2xl'],
    fontWeight: designTokens.typography.fontWeight.semibold,
    lineHeight: designTokens.typography.lineHeight.tight,
  },
  h4: {
    fontSize: designTokens.typography.fontSize.xl,
    fontWeight: designTokens.typography.fontWeight.semibold,
    lineHeight: designTokens.typography.lineHeight.normal,
  },
  h5: {
    fontSize: designTokens.typography.fontSize.lg,
    fontWeight: designTokens.typography.fontWeight.semibold,
    lineHeight: designTokens.typography.lineHeight.normal,
  },
  h6: {
    fontSize: designTokens.typography.fontSize.base,
    fontWeight: designTokens.typography.fontWeight.semibold,
    lineHeight: designTokens.typography.lineHeight.normal,
  },
  body: {
    fontSize: designTokens.typography.fontSize.sm,
    fontWeight: designTokens.typography.fontWeight.normal,
    lineHeight: designTokens.typography.lineHeight.normal,
  },
  caption: {
    fontSize: designTokens.typography.fontSize.xs,
    fontWeight: designTokens.typography.fontWeight.medium,
    lineHeight: designTokens.typography.lineHeight.normal,
  },
  small: {
    fontSize: designTokens.typography.fontSize.xs,
    fontWeight: designTokens.typography.fontWeight.normal,
    lineHeight: designTokens.typography.lineHeight.normal,
  },
};

const colorStyles = {
  primary: designTokens.colors.neutral[900],
  secondary: designTokens.colors.neutral[700],
  muted: designTokens.colors.neutral[600],
  inverse: designTokens.colors.background.primary,
  success: designTokens.colors.semantic.success[600],
  warning: designTokens.colors.semantic.warning[600],
  error: designTokens.colors.semantic.error[600],
};

const weightStyles = {
  normal: designTokens.typography.fontWeight.normal,
  medium: designTokens.typography.fontWeight.medium,
  semibold: designTokens.typography.fontWeight.semibold,
  bold: designTokens.typography.fontWeight.bold,
};

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  weight,
  color = 'primary',
  align = 'left',
  className = '',
  children,
  as,
  ...props
}) => {
  // Determine the appropriate HTML element
  const Component = as || (variant.startsWith('h') ? variant : 'p');
  
  const styles = {
    ...variantStyles[variant],
    fontWeight: weight ? weightStyles[weight] : variantStyles[variant].fontWeight,
    color: colorStyles[color],
    textAlign: align,
    fontFamily: designTokens.typography.fontFamily.sans.join(', '),
    margin: 0, // Reset default margins
  };

  return (
    <Component
      style={styles}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
};

// Convenient sub-components for common use cases
export const Heading1 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h1" {...props} />
);

export const Heading2 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h2" {...props} />
);

export const Heading3 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h3" {...props} />
);

export const Heading4 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h4" {...props} />
);

export const Body = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="body" {...props} />
);

export const Caption = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="caption" {...props} />
);

export const Small = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="small" {...props} />
);
