/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better performance
  experimental: {
    // optimizeCss: true, // Disabled due to Docker build issues
    serverComponentsExternalPackages: [],
  },

  // TypeScript configuration
  typescript: {
    // Only run type checking in development
    ignoreBuildErrors: false,
  },

  // ESLint configuration  
  eslint: {
    // Run ESLint during builds
    ignoreDuringBuilds: false,
  },

  // Image optimization for Figma assets
  images: {
    domains: ['figma.com', 'figma-alpha-api.s3.us-west-2.amazonaws.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Custom webpack configuration for SVG handling
  webpack: (config) => {
    // Handle SVG files from Figma assets
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  // Environment variables
  env: {
    CUSTOM_KEY: 'P360_FRONTEND',
    FIGMA_API_KEY: process.env.FIGMA_API_KEY,
    FIGMA_FILE_KEY: process.env.FIGMA_FILE_KEY,
  },

  // Redirect configuration  
  async redirects() {
    return [
      // Remove the automatic redirect to let users see the homepage
      // {
      //   source: '/',
      //   destination: '/dashboard/campaigns',
      //   permanent: false,
      // },
    ];
  },

  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },

  // Optimize output for production
  output: 'standalone',
  
  // Configure build output
  distDir: '.next',
  
  // Enable React strict mode
  reactStrictMode: true,

  // Disable powered by header
  poweredByHeader: false,

  // Configure compression
  compress: true,

  // Configure trailing slash behavior
  trailingSlash: false,
};

module.exports = nextConfig;