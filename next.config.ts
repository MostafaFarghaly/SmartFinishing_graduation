/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'projectapi-ekhpcndsdgbahqhm.canadacentral-01.azurewebsites.net',
        pathname: '/resources/**', // للصور السابقة من workers
      },
      {
        protocol: 'https',
        hostname: 'projectapi-ekhpcndsdgbahqhm.canadacentral-01.azurewebsites.net',
        pathname: '/images/services/**', // للمسارات الحالية
      },
    ],
  },
};

module.exports = nextConfig;
