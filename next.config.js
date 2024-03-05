/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "eaglecollections.s3.amazonaws.com",
      "lh3.googleusercontent.com",
      "eaglecollectionstore.s3.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
