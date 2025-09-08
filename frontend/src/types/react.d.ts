// React type overrides to fix Next.js 14 + React 18 compatibility issues

// Global type augmentation for better compatibility
declare global {
  namespace React {
    type ReactNode = 
      | ReactElement
      | string
      | number
      | bigint
      | ReactFragment
      | ReactPortal
      | boolean
      | null
      | undefined;
  }
}

export {};
