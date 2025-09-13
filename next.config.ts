import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Use default .next directory instead of build
  // distDir: '.next',
  
  // Keep webpack config for production builds
  webpack: (config, { isServer }) => {
    // Ignore scanning Application Data
    config.module.rules.push({
      test: /\.(js|ts|jsx|tsx)$/,
      exclude: [
        "C://Users//DELL//Application Data//",
        "C://Users//VARDHAN//Application Data//"
      ],
    });
    return config;
  },
  
  // Additional configuration for better compatibility
  typescript: {
    // Don't ignore TypeScript errors during build
    ignoreBuildErrors: false,
  },
  eslint: {
    // Don't ignore ESLint errors during build
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
