import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    // The single "Young Women Entrepreneurs" collection was split into two.
    return [{ source: '/young-women-entrepreneurs', destination: '/women-entrepreneurs', permanent: true }];
  },
  experimental: {
    serverActions: { bodySizeLimit: '6mb' },
  },
};

export default nextConfig;
