/**
 * P360 AuthLayout Component
 * Layout wrapper for authentication pages with P360 branding
 */

import React from 'react';
import '@/styles/typography.css';

export interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  backgroundVariant?: 'gradient' | 'solid' | 'pattern';
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  showLogo = true,
  backgroundVariant = 'gradient'
}) => {
  const getBackgroundClasses = (): string => {
    switch (backgroundVariant) {
      case 'gradient':
        return 'bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50';
      case 'pattern':
        return 'bg-gray-50';
      case 'solid':
      default:
        return 'bg-white';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-p360 ${getBackgroundClasses()}`}>
      {/* Header with Logo */}
      {showLogo && (
        <header className="w-full p-6">
          <div className="flex justify-center">
            <img 
              src="/pipeline360-logo.svg" 
              alt="Pipeline360 Logo" 
              className="h-8 w-auto"
            />
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Title Section */}
          {(title || subtitle) && (
            <div className="text-center">
              {title && (
                <h1 className="text-p360-h1 font-semibold text-p360-primary-text mb-2">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-p360-body-2 text-p360-secondary-text">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {/* Content */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full p-6">
        <div className="text-center">
          <p className="text-p360-body-3 text-p360-muted-text">
            © 2024 Pipeline360. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
