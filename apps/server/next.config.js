/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  env: {
    REACT_APP_SITE_URL: "http://localhost:3002", // process.env.REACT_APP_SITE_URL,
  },
};
