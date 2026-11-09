import { execSync } from 'node:child_process';
import type { NextConfig } from 'next';

// The commit this build comes from, shown in the footer. Vercel provides it;
// local builds ask git.
function buildSha() {
  if (process.env.VERCEL_GIT_COMMIT_SHA) return process.env.VERCEL_GIT_COMMIT_SHA;
  try {
    return execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
}

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    BUILD_SHA: buildSha(),
    BUILD_REF: process.env.VERCEL_GIT_COMMIT_REF ?? 'main',
    BUILD_DATE: new Date().toISOString(),
  },
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
      {
        // Long-cache immutable static images.
        source: '/assets/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
  async redirects() {
    // Keep old static-site URLs working.
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/archive.html', destination: '/archive', permanent: true },
    ];
  },
};

export default nextConfig;
