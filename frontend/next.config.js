const { withLucide } = require('lucide-react/dist/cjs/lucide-react.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Monorepo 구조에서는 output: 'standalone'이 배포 시 유리할 수 있습니다.
  output: 'standalone',
};

module.exports = nextConfig;
