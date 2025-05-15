import type { NextConfig } from 'next';
import { BASE_DOMAIN } from './app/config-global';

const nextConfig: NextConfig = {
  images: {
    domains: ['127.0.0.1',BASE_DOMAIN], // Add the domains you want to allow
  },
};

export default nextConfig;
