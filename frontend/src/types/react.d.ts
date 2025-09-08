// React type overrides to fix Next.js 14 + React 18 compatibility issues

declare module 'react' {
  interface ReactNode {
    // Extend ReactNode to include bigint for compatibility
    bigint?: never;
  }
}

// Global type augmentation for better compatibility
declare global {
  namespace React {
    type ReactNode = 
      | ReactElement
      | string
      | number
      | ReactFragment
      | ReactPortal
      | boolean
      | null
      | undefined;
  }
}

export {};
