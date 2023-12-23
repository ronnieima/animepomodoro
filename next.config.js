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
        hostname: "img1.ak.crunchyroll.com",
        port: "",
        pathname: "/i/**",
      },
    ],
  },
};

module.exports = nextConfig;
