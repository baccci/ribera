/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    esmExternals: 'loose'
  },
  webpack: (config) => {
    config.externals = [...config.externals, { '@napi-rs/canvas': '@napi-rs/canvas' }] 
    return config
  }
}

module.exports = nextConfig
