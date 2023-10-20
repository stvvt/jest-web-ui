/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['@stv/jest-sse-server'],
}

module.exports = nextConfig
