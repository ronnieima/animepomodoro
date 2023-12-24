/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net",
        port: "",
        pathname: "/img/**",
      },
    ],
  },
};

module.exports = nextConfig;
