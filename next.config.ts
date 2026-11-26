import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    // Collections were renamed; keep the old addresses working.
    return [
      { source: '/young-women-entrepreneurs', destination: '/she-builds-uae', permanent: true },
      { source: '/women-entrepreneurs', destination: '/she-builds-uae', permanent: true },
      { source: '/young-entrepreneurs', destination: '/young-turks', permanent: true },
    ];
  },
  experimental: {
    serverActions: { bodySizeLimit: '6mb' },
  },
};

export default nextConfig;
