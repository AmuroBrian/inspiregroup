/** @type {import('next').NextConfig} */
import nextI18NextConfig from "./next-i18next.config.js";

const nextConfig = {
  reactStrictMode: true,
  ...nextI18NextConfig, // Spread i18n config
};

export default nextConfig;
