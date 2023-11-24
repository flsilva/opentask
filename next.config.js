/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

const withPWA = require('@ducanh2912/next-pwa').default({
  aggressiveFrontEndNavCaching: true,
  cacheOnFrontEndNav: true,
  dest: 'public',
});

const withMDX = require('@next/mdx')();

module.exports = withMDX(withPWA(nextConfig));
