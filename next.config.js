/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'ui-avatars.com',
      'res.cloudinary.com',
      'image.tmdb.org',
      'i.scdn.co',
      'books.google.com',
    ],
    dangerouslyAllowSVG: true,
  },
}

module.exports = nextConfig
