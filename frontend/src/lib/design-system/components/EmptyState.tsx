/**
 * P360 Design System - EmptyState Component
 * Reusable empty state component for consistent empty experiences
 */

import React from 'react';
import { designTokens } from '../tokens';
import { Typography } from './Typography';
import { Button, ButtonProps } from './Button';

export interface EmptyStateProps {
  title: string;
  description?: string;
  illustration?: string | React.ReactNode;
  primaryAction?: {
    label: string;
    onClick: () => void;
  } & Partial<ButtonProps>;
  secondaryAction?: {
    label: string;
    onClick: () => void;
  } & Partial<ButtonProps>;
  size?: 'sm' | 'base' | 'lg';
  className?: string;
}

const getSizeStyles = (size: EmptyStateProps['size']) => {
  switch (size) {
    case 'sm':
      return {
        container: { maxWidth: '300px', gap: designTokens.spacing[4] },
        illustration: { width: '120px', height: '120px' },
        content: { gap: designTokens.spacing[2] },
        actions: { gap: designTokens.spacing[2] },
      };
    case 'lg':
      return {
        container: { maxWidth: '500px', gap: designTokens.spacing[8] },
        illustration: { width: '280px', height: '280px' },
        content: { gap: designTokens.spacing[4] },
        actions: { gap: designTokens.spacing[4] },
      };
    case 'base':
    default:
      return {
        container: { maxWidth: '400px', gap: designTokens.spacing[6] },
        illustration: { width: '200px', height: '200px' },
        content: { gap: designTokens.spacing[3] },
        actions: { gap: designTokens.spacing[3] },
      };
  }
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  illustration,
  primaryAction,
  secondaryAction,
  size = 'base',
  className = '',
}) => {
  const sizeStyles = getSizeStyles(size);

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as const,
    ...sizeStyles.container,
  };

  const illustrationStyles = {
    ...sizeStyles.illustration,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: designTokens.spacing[4],
  };

  const contentStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    width: '100%',
    ...sizeStyles.content,
  };

  const actionsStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    width: '100%',
    ...sizeStyles.actions,
  };

  const renderIllustration = () => {
    if (!illustration) return null;

    if (typeof illustration === 'string') {
      return (
        <img
          src={illustration}
          alt="Empty state illustration"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      );
    }

    return illustration;
  };

  return (
    <div style={containerStyles} className={className}>
      {illustration && (
        <div style={illustrationStyles}>
          {renderIllustration()}
        </div>
      )}

      <div style={contentStyles}>
        <Typography
          variant={size === 'lg' ? 'h3' : 'h4'}
          color="primary"
          align="center"
          weight="semibold"
        >
          {title}
        </Typography>

        {description && (
          <Typography
            variant="body"
            color="muted"
            align="center"
          >
            {description}
          </Typography>
        )}
      </div>

      {(primaryAction || secondaryAction) && (
        <div style={actionsStyles}>
          {primaryAction && (() => {
            const { onClick: primaryOnClick, label: primaryLabel, ...primaryRest } = primaryAction;
            return (
              <Button
                variant="primary"
                size={size}
                onClick={primaryOnClick}
                {...primaryRest}
              >
                {primaryLabel}
              </Button>
            );
          })()}

          {secondaryAction && (() => {
            const { onClick: secondaryOnClick, label: secondaryLabel, ...secondaryRest } = secondaryAction;
            return (
              <Button
                variant="ghost"
                size={size}
                onClick={secondaryOnClick}
                {...secondaryRest}
              >
                {secondaryLabel}
              </Button>
            );
          })()}
        </div>
      )}
    </div>
  );
};

// Convenient presets for common empty states
export const EmptyCampaigns = (props: Partial<EmptyStateProps>) => (
  <EmptyState
    title="You don't have any campaigns yet"
    description="Something cool here"
    illustration="/empty-campaign-illustration.png"
    {...props}
  />
);

export const EmptyResults = (props: Partial<EmptyStateProps>) => (
  <EmptyState
    title="No results found"
    description="Try adjusting your search criteria or filters"
    size="sm"
    {...props}
  />
);

export const EmptyData = (props: Partial<EmptyStateProps>) => (
  <EmptyState
    title="No data available"
    description="There's nothing to show here yet"
    size="sm"
    {...props}
  />
);

export const EmptyOrganizations = (props: Partial<EmptyStateProps>) => (
  <EmptyState
    title="There's no Organization yet"
    description="Something cool here"
    illustration="/organization-illustration.png"
    {...props}
  />
);
