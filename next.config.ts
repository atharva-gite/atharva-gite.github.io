import type { NextConfig } from "next";

// Set by the GitHub Pages workflow. Empty for local dev, `/portfolio` on Pages.
const pagesBasePath = (process.env.PAGES_BASE_PATH ?? "").replace(/\/$/, "");
const basePath = pagesBasePath === "/" ? "" : pagesBasePath;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  ...(basePath ? { basePath } : {}),
  images: { unoptimized: true },
  // The dev server is bound on 0.0.0.0 and opened at 127.0.0.1.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
