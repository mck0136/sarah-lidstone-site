/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    const pages = {
      Home: "/", About: "/about", Research: "/research", Speaking: "/speaking-media",
      IntegratedCare: "/integrated-care", Consulting: "/consulting", Creative: "/creative",
      Education: "/education", Contact: "/contact", Privacy: "/privacy", Accessibility: "/accessibility"
    };
    return [
      { source: "/speaking", destination: "/speaking-media", permanent: true },
      ...Object.entries(pages).map(([name, destination]) => ({ source: `/${name}.dc.html`, destination, permanent: true }))
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com"
      }
    ]
  }
};

export default nextConfig;
