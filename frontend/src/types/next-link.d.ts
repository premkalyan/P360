/**
 * Temporary type override for Next.js Link component
 * Fixes React version conflicts in monorepo setup
 */

declare module 'next/link' {
  import React from 'react';
  
  interface LinkProps {
    href: string;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  }
  
  const Link: React.FC<LinkProps>;
  export default Link;
}
