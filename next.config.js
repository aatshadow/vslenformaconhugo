/** @type {import('next').NextConfig} */
// basePath se controla por env para que la misma build sirva en:
//  - dominio dedicado del VSL (sin prefijo)
//  - reverse-proxy desde central.blackwolfsec.io/vslenformaconhugo
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  reactStrictMode: true,
  basePath: BASE_PATH || undefined,
  assetPrefix: BASE_PATH || undefined,
  env: { NEXT_PUBLIC_BASE_PATH: BASE_PATH },
};

module.exports = nextConfig;
