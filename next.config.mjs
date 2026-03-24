/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 👈 this creates the /out folder
  trailingSlash: true,
  

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true, // required for static export
  },
};

export default nextConfig;
