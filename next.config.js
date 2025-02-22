/** @type {import('next').NextConfig} */
const nextConfig = {};

const withPWA = require('next-pwa')({
    dest: 'public'
  })

module.export = withPWA(nextConfig)
