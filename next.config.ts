import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Zorgt voor strikte React-richtlijnen tijdens ontwikkeling
  images: {
    domains: ['lh3.googleusercontent.com'], // Voeg hier de toegestane domeinen toe
  },
};

export default nextConfig;
