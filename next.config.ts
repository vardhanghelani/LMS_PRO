/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   experimental: {
//     serverActions: {},
//   },
// };

// module.exports = nextConfig;
// next.config.ts
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  distDir: 'build',
  webpack: (config, { isServer }) => {
    // Ignore scanning Application Data
    config.module.rules.push({
      test: /\.(js|ts|jsx|tsx)$/,
      exclude: [
        "C://Users//DELL//Application Data//"
      ],
    });
    return config;
  },
};

export default nextConfig;
