import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "poirostoragebay.blob.core.windows.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "rukminim2.flixcart.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn1.gstatic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images-eu.ssl-images-amazon.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "poiroscope-cdn-byf0adcgbugabqdg.z03.azurefd.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "poiroscope-cdn-india-h7akfsh3aghjceam.z03.azurefd.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "v3.fal.media",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "v3b.fal.media",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fal.media",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "falserverless",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
